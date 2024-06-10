import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { Route, Router } from '@angular/router';
declare var Razorpay: any;



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})


export class CheckoutComponent implements OnInit {

  data: any;
  subtotal: any;
  products: any;
  order:any;
  name:any;
  email:any;
  mobileno:any;
  city:any;
  pincode:any;
  total:any;
  orderdata:any;

  url: any = "https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Orders";

  constructor(private api:ApiService, private router:Router) {

  }

  ngOnInit(): void {

    this.data = JSON.parse(localStorage.getItem('products') || '[]');

    console.log(this.data);
    this.subtotal = this.data.reduce((total: any, curr: any) => total + curr.price * curr.quantity, 0);

   this.bind();

   
  }

  bind()
  {
    this.order = new FormGroup({
      id: new FormControl (''),
      name: new FormControl ('', Validators.compose([Validators.required])),
      email: new FormControl ('', Validators.compose([Validators.required, Validators.email])),
      mobileno: new FormControl ('',Validators.compose([Validators.required])),
      city: new FormControl ('', Validators.compose([Validators.required])),
      pincode: new FormControl ('', Validators.compose([Validators.required])),
      total:new FormControl (this.subtotal)
    })
  }

// ----------------------- Razor Pay Code --------------------------

  title = 'payment';

  options = {
    "key": "rzp_test_XcVZekti6FpTCx",
    "amount": "2000",
    "name": "E-Commerce",
    "description": "Web Development",
    "image": "https://cdn-icons-png.flaticon.com/512/8539/8539259.png",
    "order_id": "",
    "handler": function (response: any) {
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    },
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };


  placeorder(order:any) {
    this.orderdata = order;

    this.options.amount = (this.subtotal * 100).toString();
    this.options.prefill.name = (this.orderdata.name);
    this.options.prefill.email = (this.orderdata.email);   
    this.options.prefill.contact = (this.orderdata.mobileno);
    var rzp1 = new Razorpay(this.options);
    rzp1.open();
    rzp1.on('payment.failed', function (response: any) {
      //this.message = "Payment Failed";
      // Todo - store this information in the server
      console.log(response.error.code);
      console.log(response.error.description);
      console.log(response.error.source);
      console.log(response.error.step);
      console.log(response.error.reason);
      console.log(response.error.metadata.order_id);
      console.log(response.error.metadata.payment_id);
      //this.error = response.error.reason;
    }
    );
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log(event.detail);
    // alert("Hello");

    console.log(this.orderdata);
    
    this.api.post(this.orderdata).subscribe((result)=>{
      // this.order = result;
      // console.log(this.order);
    }) 

    Swal.fire({
      title: 'Order Placed Succsessfully',
      icon: 'success'
    })
   
    this.order.reset();

    this.router.navigate(['/home']);


  }


// ----------------------- Razor Pay Code End --------------------------



}

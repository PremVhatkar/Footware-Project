import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  data: any;

  subtotal: any;

  quantity: any = 1;


  constructor(private router: Router) {
  }

  ngOnInit(): void {

    this.data = JSON.parse(localStorage.getItem('products') || '[]');

    console.log(this.data);

    this.calculateSubtotal();

  }

  checkout() {
    this.router.navigate(['/checkout']);
  }


  delete(productId: any) {
    this.data = this.data.filter((product: any) => product.id !== productId);
    localStorage.setItem('products', JSON.stringify(this.data))

    Swal.fire({
      title: 'Product Removed Succsessfully',
      icon: 'success'
    })

    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.data.reduce((total: any, curr: any) => total + curr.price * curr.quantity, 0);
  }

  // addquantity() {
  //   this.quantity += 1;
  // }

  // minusqantity() {
  //   if (this.quantity > 1) {
  //     this.quantity -= 1;
  //   }
  // }



}

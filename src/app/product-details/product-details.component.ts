import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {

  id: any;
  details: any;
  quantity: number = 1;
  product: any;
  products: any = []

  ngOnInit(): void {
    this.products = JSON.parse(localStorage.getItem("products") || "[]")

  }

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.id = route.snapshot.paramMap.get("id");

    console.log(this.id);


    http.get("https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Products/" + this.id).subscribe(result => {
      this.product = result;
    })

  }

  addtocart() {
    let existingProduct = null;

    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === this.product.id) {
        existingProduct = this.products[i];
        break;
      }
    }


    if (existingProduct) {
      existingProduct.quantity += this.quantity;

      Swal.fire({
        title: 'Product already exists in cart',
        icon: 'success'
      })
      

    }
    else {
      const newProduct = {
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image,
        description: this.product.description
      };

      this.products.push(newProduct);

      Swal.fire({
        title: 'Product Added to Cart',
        icon: 'success'
      })
      

    }

    localStorage.setItem("products", JSON.stringify(this.products));

  }


  // addtocart() {

  //     this.details = {
  //       id: this.product.id,
  //       name: this.product.name,
  //       price: this.product.price,
  //       quantity: this.quantity,
  //       image: this.product.image,
  //       desciption: this.product.desciption
  //     }

  //     // Push data to local storage

  //     this.products.push(this.details);
  //     console.log(this.products);
  //     localStorage.setItem("products", JSON.stringify(this.products));

  //     alert("Product Added to cart........")


  //   }

  plus() {
    this.quantity += 1;
  }

  minus() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }
}

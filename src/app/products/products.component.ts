import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  URL: any = 'https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Products';

  products: any;

  constructor(private http: HttpClient) {
    http.get(this.URL).subscribe(data => {
      this.products = data;      
    });
  }
}

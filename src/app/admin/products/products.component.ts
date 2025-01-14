import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
   
      this.getall();

  }

  getall() {
    this.api.get().subscribe((data) => {
      this.products = data;
    })
  }

  delete(id: number) {
    this.api.delete(id).subscribe((data) => {
      this.products = data;
      this.getall();
    })
  }

}

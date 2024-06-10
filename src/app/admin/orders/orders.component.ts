import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  url: any = "https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Orders";


  order: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe((result) => {

      this.order = result;
      console.log(this.order);
      
    })
   

  }


}
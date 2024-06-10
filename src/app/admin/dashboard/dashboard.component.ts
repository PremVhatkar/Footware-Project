import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  url: any = "https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Orders";
  data: any;
  arrSize: any = 0;
  products: any;

  order: any;
  arr: any;


  constructor(private router: Router, private api: ApiService, private http: HttpClient, private authService:AuthService) {
    this.http.get(this.url).subscribe((result) => {
      this.order = result;
    })
  }



  ngOnInit(): void {

    this.data = JSON.parse(localStorage.getItem('products') || '[]');
    this.arrSize = this.data.length;

    this.api.get().subscribe((data) => {
      this.products = data;
    })

  }

  logout() {
    this.authService.logout();
    Swal.fire({
      title: 'Logout Succsessfully',
      icon: 'success'
    })
    this.router.navigate(['/login']);
  }

  // addproduct() {
  //   this.router.navigate(['/admin/product']);
  // }

  fetch() {

  }
}

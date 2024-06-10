import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  logindata: any;

  constructor(private router: Router) { }

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  
  isLoggedin():any
  {
    if(localStorage.getItem('token') != null)
      {
        return true;
      }
      else
      {
        return false;
      }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/'])
  }


  login(data: any):any {
    if (data.username == "admin" && data.password == 123) {
      this.setToken("djfhdfjasfdhlsjkdfhjsha");

      return { status: "success", data: { name: "Prem", username: "admin", usertype: "admin" } };
    }

    else if (data.username == "manager" && data.password == 123) {
      this.setToken("djfhdfjasfdhlsjkdfhjsha");

      return { status: "success", data: { name: "Prem", username: "manager", usertype: "manager" } };
    }

    else {

      return { status: "failed" }
    };
  }
}

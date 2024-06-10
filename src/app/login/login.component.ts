import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  logindata: any;
  username: any;
  password: any;
  form: any;

  constructor(private router: Router, private authservice: AuthService) {

  }

  ngOnInit(): void {
    if(this.authservice.isLoggedin()){
      this.router.navigate(['/admin/dashboard']);
    }
    
    this.logindata = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }



  login(data: any) {
    // console.log(data);
    // if (data.username == "admin" && data.password == 123) {
    //   Swal.fire({
    //     title: 'Login Succsessfully',
    //     icon: 'success'
    //   })
    //   this.router.navigate(['/admin/dashboard']);
    // }
    // else {
    //   Swal.fire({
    //     title: 'Invalid Credentials',
    //     icon: 'error'
    //   })
    // }
    // this.logindata.reset();

    let result = this.authservice.login(data);
    if (result.status == "success") {
      localStorage.setItem("name", result.data.name);
      localStorage.setItem("username", result.data.username);
      localStorage.setItem("usertype", result.data.usertype);
      Swal.fire({
        title: 'Login Succsessfully',
        icon: 'success'
      })
      this.router.navigate(['/admin/dashboard']);

    }
    else {
      Swal.fire({
        title: 'Invalid Credentials',
        icon: 'error'
      })
      this.logindata.reset();
    }



  }


}

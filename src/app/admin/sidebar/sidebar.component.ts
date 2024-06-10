import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router:Router, private authService:AuthService){}

  logout(){
    this.authService.logout();
    Swal.fire({
      title: 'Logout Succsessfully',
      icon: 'success'
    })
    this.router.navigate(['/login']);
  }

}

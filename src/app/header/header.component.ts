import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  data:any;
  arrSize:any = 0;

  
  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('products') || '[]');
    this.arrSize = this.data.length;
  }



}

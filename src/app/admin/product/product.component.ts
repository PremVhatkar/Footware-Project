import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: any;
  id: any;
  formData: any;


  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) { }




  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id != null) {
      this.api.getbyid(this.id).subscribe((data) => {
        this.products = data;
        console.log(data);
        this.bind();
      })
    }
    else {
      this.bind();

    }
  }

  bind() {
    this.formData = new FormGroup({
      id: new FormControl(this.products != null ? this.products.id : "0"),
      name: new FormControl(this.products != null ? this.products.name : ""),
      price: new FormControl(this.products != null ? this.products.price : ""),
      description: new FormControl(this.products != null ? this.products.description : ""),
      image: new FormControl(this.products != null ? this.products.image : "")
    })
  }


  submit(data: any) {

    console.log(data);

    if (data.id != 0) {
      this.api.put(data, data.id).subscribe((data) => {
        this.router.navigate(['/admin/products'])
        console.log(data)
      })
    }
    else {
      this.api.post(data).subscribe((result) => {
        this.router.navigate(['/admin/products'])
        console.log(result)
      })

    }

  }
}

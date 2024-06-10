import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

baseurl:any = "https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Products";

  constructor(private http:HttpClient) { }


  // To get all records
  get() {
    return this.http.get(this.baseurl);
  }

  // To get all records by id

  getbyid(id: any) {
    return this.http.get(this.baseurl + "/" + id);
  }

  // To insert record
  post(body: any) {
    return this.http.post(this.baseurl, body);
  }

  // To update record by id
  put(body: any, id: number) {
    return this.http.put(this.baseurl + "/" + id, body);
  }

  // To delete record by id
  delete(id: number) {
    return this.http.delete(this.baseurl + "/" + id);
  }

}

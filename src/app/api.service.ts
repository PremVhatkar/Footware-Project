import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:any = "https://661d08ade7b95ad7fa6beca2.mockapi.io/Api/Orders"

  
  constructor(private http:HttpClient) {}

  
  // To get all records
  get() {
    return this.http.get(this.url);
  }

  // To get all records by id

  getbyid(id: any) {
    return this.http.get(this.url + "/" + id);
  }

  // To insert record
  post(body: any) {
    return this.http.post(this.url, body);
  }

  // To update record by id
  put(body: any, id: number) {
    return this.http.put(this.url + "/" + id, body);
  }

  // To delete record by id
  delete(id: number) {
    return this.http.delete(this.url + "/" + id);
  }


}

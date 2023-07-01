import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = "http://localhost:3000/email/email";
  constructor(private httpreq:HttpClient) { }

  sendMessage(body: any){
    let headers = {
      headers : new HttpHeaders({
        'Content-Type' :'application/json'
      })
    }
    return this.httpreq.post(`${this.url}`,body,headers);
  }
}

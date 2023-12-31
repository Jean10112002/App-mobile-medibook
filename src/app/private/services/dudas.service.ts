import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class DudasService {
  private readonly Api:string=config.apiUrl;
  constructor(private readonly httpClient:HttpClient) { }

  getDudas(){
    return this.httpClient.get(`${this.Api}dudas`);
  }
  create(body:any){
    return this.httpClient.post(`${this.Api}dudas`,body);
  }
  replyDudaCreate(body:any){
    return this.httpClient.post(`${this.Api}replydudas`,body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModelsService } from './models.service';
import { Channel, NewSalesItems, Sales, User } from './interfaces';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url: string = 'https://localhost:44312/api/';
  custNo: string;

  constructor(private http: HttpClient,
              private models: ModelsService) { }
  
  public setUpdateCustNo(cn: string){
    this.custNo = cn;
  }

  public getUpdateCustNo(): string{
    return this.custNo;
  } 

  public getUsers() {
    return this.http.get(this.url + 'getuser')
  }

  public loginUser(userId: string){
    return this.http.get(this.url + 'getuser/' + userId);
  }

  public addNewUser(user: User){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${this.url}GetUser`, JSON.stringify(user), httpOptions);
  }

  public updatePass(user: User){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(`${this.url}GetUser/${user.UserId}`, JSON.stringify(user), httpOptions);
  }

  public getCustNo(){
    return this.http.get(`${this.url}custno`);
  }

  public getChannels(){
    return this.http.get(this.url + 'channels');
  }

  public saveChannel(ch: Channel){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.url + 'channels', JSON.stringify(ch), httpOptions);
  }

  public deleteChannel(ch: Channel){
    return this.http.delete(`${this.url}channels?chIndex=${ch.ChIndex}`);
  }

  public getSales(){
    return this.http.get(this.url + 'sales');
  }

  public getSingleSales(cn: string){
    return this.http.get(`${this.url}sales?cn=${cn}`);
  }

  public getSingleRegion(address: string){
    return this.http.get(`${this.url}region?regionid=${address}`);
  }

  public saveSales(sales: Sales){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post(this.url + 'sales', JSON.stringify(sales), httpOptions);
  }

  public updateSales(id: string, sales: Sales){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(`${this.url}sales/${id}`, JSON.stringify(sales), httpOptions);
  }

  public deleteSalesItem(id: string, items: NewSalesItems){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.put(`${this.url}sales/${id}`, JSON.stringify(items), httpOptions);
  }

}

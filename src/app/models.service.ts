import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  userId: string = '';
  userName: string = '';
  userRole: string = '';

  constructor() { }

  setUser(u: object){
    this.userId = u['UserId'];
    this.userName = u['UserName'];
  }

  getUser(){
    let u: Object;
    u = [{ UserId: this.userId, UserName: this.userName}]
    return u;
  }
}

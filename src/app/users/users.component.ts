import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../models.service';
import { DataService } from '../data.service';
import { EncryptionService } from '../encryption.service';
import { Router } from '@angular/router';
import { User } from '../interfaces';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  user: User;

  userid: string;
  username: string;

  //for change pass
  oldPass: string;
  newPass: string;
  confirmPass: string;

  //for new user
  userId: string;
  userName: string;
  passWord: string;

  xbadPass: boolean = false;
  xnotMatch: boolean = false;
  xchangePass: boolean = false;
  xnewUser: boolean = false;

  constructor(private models: ModelsService,
              private data: DataService,
              private router: Router,
              private encr: EncryptionService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');
    console.log(this.userid);
    if(this.userid == ''){
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    localStorage.setItem('userid', '');
    this.router.navigateByUrl('/login');
  }

  changePass(){
    this.xchangePass = true;
  }

  changePassSubmit(){
    this.xnotMatch = false;
    this.xbadPass = false;

    if(this.newPass == this.confirmPass){
      this.checkPassword(this.oldPass);
    }
    else{
      this.xnotMatch = true;
    }
  }

  checkPassword(pass: string){
    this.data.loginUser(localStorage.getItem('userid')).subscribe(
      x => {
        this.user = x;
        let p: string = this.encr.decrypt('$#@!', this.user.Password)
        if(pass == p){
          this.user.Password = this.encr.encrypt('$#@!', this.newPass);
          this.data.updatePass(this.user).subscribe(
            x => {
              if(Boolean(x)){
                this.logout();
              }
            }
          )
        }
        else
          this.xbadPass = true;
      }
    )
  }

  cancelChangePass(){
    this.xchangePass = false;
    this.xnewUser = false;
  }

  newUser(){
    this.xnewUser = true;
  }

  newUserSubmit(){
    let u: User = {
      UserId: this.userId,
      UserName: this.userName,
      Password: this.encr.encrypt('$#@!', this.passWord)
    }

    this.data.addNewUser(u).subscribe(
      x => {
        console.log(`save new user = ${Boolean(x)}`)
        this.cancelNewUser();
      }
    )
  }

  cancelNewUser(){
    this.xchangePass = false;
    this.xnewUser = false;
  }
}

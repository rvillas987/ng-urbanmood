import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { ModelsService } from '../models.service';
import { EncryptionService } from '../encryption.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userId: string = '';
  err_u: boolean = false;
  password: string = '';
  err_p: boolean = false;
  user$: object;

  constructor(private data: DataService, 
              private models: ModelsService, 
              private router: Router,
              private encr: EncryptionService) {
  }

  ngOnInit(): void {
    
  }

  login(){
    if(this.userId != '')
    {
      this.data.loginUser(this.userId).subscribe(x => {        
        this.user$ = x;
        this.verifyInputs(this.user$);
      });
    }
  }

  getId(input){
    this.userId = input;
  }

  getPass(input){
    this.password = input;
  }

  verifyInputs(input$: object){
    if(input$['UserId'] == null){
      this.err_u = true;
    }
    else{
      this.err_u = false;
      if(this.encr.decrypt('$#@!', input$['Password']) == this.password){
        console.log('login successful')
        localStorage.setItem('userid', input$['UserId']);
        localStorage.setItem('username', input$['UserName']);
        this.router.navigateByUrl('/users');
        this.err_p = false;
      }
      else{
        this.err_p = true;
      }
    }
  }


}

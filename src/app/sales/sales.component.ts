import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../models.service';
import { Router } from '@angular/router';
import { Sales } from '../interfaces';
import { DataService } from '../data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  sales: any;

  constructor(private router: Router,
              private models: ModelsService,
              private data: DataService) { }

  ngOnInit(): void {
    this.checkIfLoggedIn();

    this.getSales();

    this.data.setUpdateCustNo('');
  }

  getSales(){
    this.data.getSales()
      .subscribe(x=>{
        this.sales = x;
        console.log(this.sales);
      })
  }

  checkIfLoggedIn(){
    let userid = localStorage.getItem('userid');
    console.log(userid);
    if(userid == ''){
      this.router.navigateByUrl('/login');
    }
  }

  gotoNewSales(){
    this.router.navigateByUrl('/new');
  }

  updateSales(s: any){
    this.router.navigateByUrl('/new');
    this.data.setUpdateCustNo(s['CustNo']);
  }
}

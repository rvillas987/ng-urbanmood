import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { NewSalesItems, NewSales, Channel } from '../interfaces';
import { DataService } from '../data.service';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  itemsFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  items: NewSalesItems[] = [];
  sales: NewSales = null;
  sales$: any;
  custNo: string = '';
  channels: object;
  selChannel: string = '';
  type: string;
  chModel: string;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private data: DataService) { }

  ngOnInit(): void {
    this.initFormGroups();

    this.checkIfLoggedIn();

    this.loadChannels();

    this.getCustNo();
  }

  getCustNo() {    
    this.custNo = this.data.getUpdateCustNo();
    
    if (this.custNo == '') {
      console.log('new item')
      this.data.getCustNo().subscribe(
        x => {
          this.custNo = x.toString();
          this.type = '[New Entry]';
        }
      )
    }
    else {
      console.log('update item')
      this.custNo = this.data.getUpdateCustNo();
      this.type = '[Update]';
      this.loadItems();
    }
  }

  loadChannels() {
    this.data.getChannels().subscribe(
      x => {
        this.channels = x;
      }
    )
  }

  addItem() {
    this.addInputsToTable();
  }

  loadItems() {
    this.data.getSingleSales(this.custNo).subscribe(
      x => {
        this.detailsFormGroup.patchValue({
          name: x['CustName'],
          nickname: x['Nickname'],
          mobile: x['Mobile'],
        })
        this.items = x['Items'];
      }
    )
  }

  saveItems() {
    let s: NewSales = {
      custno: this.custNo,
      currdate: (new Date()).toLocaleDateString().substring(0, 10),
      custname: this.detailsFormGroup.get('name').value,
      nickname: this.detailsFormGroup.get('nickname').value,
      mobile: this.detailsFormGroup.get('mobile').value,
      items: this.items
    }

    if (this.type == '[New Entry]') {
      //new entry
      this.data.saveSales(s).subscribe(
        x => {
          if(Boolean(x) == true){
            this.router.navigateByUrl('/');
          }
        }
      )
    }
    else {
    //update
      this.data.updateSales(this.custNo, s).subscribe(
        x => {
          console.log(Boolean(x));
        }
      )
    }
  }

  editItem(item: NewSalesItems){
    console.log(`Edit Cust No. ${item.CustNo}-${item.Item}`);
    this.itemsFormGroup.setValue({
      'date': (new Date(item.OrderDate)).toLocaleDateString(),
      'item': item.Item,
      'specs': item.Specs,
      'address': item.Address,
      'quantity': item.Quantity,
      'sell': item.Sell,
      'paid': item.Paid,
      'cost': item.Cost,
      'channel': item.Channel,
      'payout': item.Payout,
      'notes': item.Notes,
      'tracking': item.Tracking,
      'status': item.Status,
      'eta': item.Eta
    });
    this.chModel = item.Channel;
    let i: number = this.items.findIndex(x => x.Item === item.Item);
    this.items.splice(i, 1);
  }

  deleteItem(item: NewSalesItems){
    let i: number = this.items.indexOf(item);
    this.items.splice(i, 1);    
  }

  checkIfLoggedIn() {
    let userid = localStorage.getItem('userid');
    if (userid == '') {
      this.router.navigateByUrl('/login');
    }
  }

  initFormGroups() {
    this.detailsFormGroup = this.formBuilder.group({
      custno: new FormControl(''),
      name: new FormControl(''),
      nickname: new FormControl(''),
      mobile: new FormControl('')
    });

    this.itemsFormGroup = this.formBuilder.group({
      date: new FormControl((new Date()).toLocaleDateString().substring(0, 10)),
      item: new FormControl(''),
      specs: new FormControl(''),
      address: new FormControl(''),
      quantity: new FormControl(''),
      sell: new FormControl(''),
      paid: new FormControl(''),
      cost: new FormControl(''),
      channel: new FormControl(''),
      payout: new FormControl(''),
      notes: new FormControl(''),
      tracking: new FormControl(''),
      status: new FormControl(''),
      eta: new FormControl('')
    });
  }

  addInputsToTable() {
    let r: string;
    this.data.getSingleRegion(this.itemsFormGroup.get('address').value).subscribe(
      x=> {
        r = x.toString();

        if (this.itemsFormGroup.get('item').value != '') {
          let x: NewSalesItems = {
            CustNo: this.custNo,
            OrderDate: this.itemsFormGroup.get('date').value,
            Item: this.itemsFormGroup.get('item').value,
            Specs: this.itemsFormGroup.get('specs').value,
            Address: this.itemsFormGroup.get('address').value,
            Region: r,
            Quantity: this.itemsFormGroup.get('quantity').value,
            Sell: this.itemsFormGroup.get('sell').value,
            Paid: this.itemsFormGroup.get('paid').value,
            Cost: this.itemsFormGroup.get('cost').value,
            Channel: String(this.chModel['Channel']) === 'undefined' ? this.chModel : this.chModel['Channel'],
            Payout: this.itemsFormGroup.get('payout').value,
            Notes: this.itemsFormGroup.get('notes').value,
            Tracking: this.itemsFormGroup.get('tracking').value,
            Status: this.itemsFormGroup.get('status').value,
            Eta: this.itemsFormGroup.get('eta').value  
          }
        this.items = this.items || [];
        this.items.push(x);

        this.emptyItemInputs();
      }
    })
  }

  emptyItemInputs() {
    this.itemsFormGroup.setValue({
      'date': (new Date()).toLocaleDateString().substring(0, 10),
      'item': '',
      'specs': '',
      'address': '',
      'quantity': '',
      'sell': '',
      'paid': '',
      'cost': '',
      'channel': '',
      'payout': '',
      'notes': '',
      'tracking': '',
      'status': '',
      'eta': ''
    });
    this.chModel='';
  }

}
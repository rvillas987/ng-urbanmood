import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { Channel } from '../interfaces';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  channels: any;
  chIndex: number = 0;
  channel: string;

  constructor(private data: DataService,
              private router: Router) { }

  ngOnInit(): void {
    this.GetChannels();

    this.checkIfLoggedIn();
  }

  GetChannels(){
    this.data.getChannels().subscribe(
      x => {
          this.channels = x;
          console.log(this.channels);
      }
    )
  }

  AddChannel(){
    if(this.channel != ''){
      let c: Channel = {
        ChIndex: this.chIndex,
        Channel: this.channel
      };
      this.data.saveChannel(c).subscribe(
        x => {
          console.log(x);
          this.GetChannels();
        }
      );
    }
  }

  ChKeyUp(e){
    this.chIndex = 1;
    this.channel = e.target.value;
    console.log(this.chIndex + ' ' + this.channel);
  }

  DeleteChannel(ch: Channel){
    this.data.deleteChannel(ch).subscribe(
      x => {
        let index = this.channels.indexOf(ch);
        console.log(index);
        this.channels.splice(index, 1);
      }
    )
  }

  checkIfLoggedIn(){
    let userid = localStorage.getItem('userid');
    console.log(userid);
    if(userid == ''){
      this.router.navigateByUrl('/login');
    }
  }
}

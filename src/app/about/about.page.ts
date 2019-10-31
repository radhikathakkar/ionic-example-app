import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from 'src/shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  leaders: any;
  errMess: string;
  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.leaderService.getLeaders()
    .subscribe((leadersData) => {
      this.leaders = leadersData;
    }, err => this.errMess = err);
  }

}

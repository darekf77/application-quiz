//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.container.html',
  styleUrls: ['./stats.container.scss']
})
export class StatsContainer implements OnInit {

  myId: number;

  @Input({
    required: false
  })
  set id(v: string) {
    this.myId = Number(v);
  }

  constructor() { }

  ngOnInit() {
  }

}
//#endregion
//#region @browser
import { Component, OnInit } from '@angular/core';
import { AnswerService } from './answer.service';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  providers: [AnswerService]
})
export class AnswerComponent implements OnInit {


  // @LAST INPUT MODEL
  constructor(
    protected service: AnswerService
  ) { }

  ngOnInit() {
  }

}
//#endregion

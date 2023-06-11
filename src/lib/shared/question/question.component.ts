//#region @browser
import { Component, OnInit } from '@angular/core';
import { QuestionService } from './question.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [QuestionService]
})
export class QuestionComponent implements OnInit {

  constructor(
    protected service: QuestionService
  ) { }

  ngOnInit() {
  }

}
//#endregion

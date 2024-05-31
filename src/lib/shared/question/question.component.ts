//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { QuestionService } from './question.service';
import type { Question } from './question';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [QuestionService],
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  constructor(protected service: QuestionService) {}

  ngOnInit() {}
}
//#endregion

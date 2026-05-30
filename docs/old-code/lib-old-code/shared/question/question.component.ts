//#region imports
import { Component, Input, OnInit } from '@angular/core';

import type { Question } from './question';
import { QuestionService } from './question.service';
//#endregion

@Component({
  selector: 'question',
  standalone: false,
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [QuestionService],
})
export class QuestionComponent implements OnInit {
  @Input()
  question: Question;

  constructor(protected service: QuestionService) {}

  ngOnInit() {}
}

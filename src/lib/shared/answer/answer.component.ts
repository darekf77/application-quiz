//#region @browser
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { AnswerService } from './answer.service';
import type { Answer } from './answer';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  providers: [AnswerService],
})
export class AnswerComponent implements OnInit {
  @ViewChild('exposedTemplate') exposedTemplate: TemplateRef<any>;
  @Input() answer: Answer;
  constructor(protected service: AnswerService) {}

  ngOnInit() {}
}
//#endregion

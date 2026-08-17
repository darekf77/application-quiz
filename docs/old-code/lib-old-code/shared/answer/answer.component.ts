//#region imports
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import type { Answer } from './answer';
import { AnswerService } from './answer.service';
//#endregion

@Component({
  selector: 'answer',
  standalone: false,
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  providers: [AnswerService],
})
export class AnswerComponent {
  @ViewChild('exposedTemplate')
  exposedTemplate: TemplateRef<any>;

  @Input()
  answer: Answer;

  constructor(protected service: AnswerService) {}
}

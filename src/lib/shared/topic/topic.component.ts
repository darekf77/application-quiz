//#region @browser
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { TopicService } from './topic.service';
import { Topic } from './topic';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  providers: [TopicService],
})
export class TopicComponent {
  @Output() questionOidChanged = new EventEmitter();
  @Input() topic: Topic;
  @Input() selectedQuestionOid: number;
  constructor(protected service: TopicService) {}

  change(questionOid) {
    this.questionOidChanged.next(questionOid);
  }
}
//#endregion

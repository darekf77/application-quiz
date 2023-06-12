//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { TopicService } from './topic.service';
import { Topic } from './topic';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  providers: [TopicService]
})
export class TopicComponent implements OnInit {
  @Input() topic: Topic;
  constructor(
    protected service: TopicService
  ) { }

  ngOnInit() {
  }

}
//#endregion

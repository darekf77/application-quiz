//#region @browser
import { Component, OnInit } from '@angular/core';
import { TopicService } from './topic.service';

@Component({
  selector: 'topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  providers: [TopicService]
})
export class TopicComponent implements OnInit {

  constructor(
    protected service: TopicService
  ) { }

  ngOnInit() {
  }

}
//#endregion

//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss']
})
export class TopicContainer implements OnInit {
  constructor(
    private store: Store<TopicInitialState>,
  ) { }

  @Input('topicId') topicTitleKebakCase; // from routing

  ngOnInit() {
    console.log('oninit!!', this.topicTitleKebakCase)
    const { topicTitleKebakCase } = this;
    if (topicTitleKebakCase) {
      this.store.dispatch(topicAction.INIT({ topicTitleKebakCase }))
    }
  }

}
//#endregion

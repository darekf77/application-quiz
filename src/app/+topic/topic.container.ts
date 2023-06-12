//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import { Observable, of } from 'rxjs';
import { AppService, appActions, appSelectors } from '../../app.store';


@Component({
  selector: 'app-topic',
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss']
})
export class TopicContainer {
  constructor(
    private store: Store<TopicInitialState>,
  ) { }

  current$ = this.store.select(appSelectors.selectedTopic);

  @Input('topicTitleKebabCase')
  set title(topicTitleKebabCase: string) {
    if (topicTitleKebabCase) {
      this.store.dispatch(topicAction.INIT_QUESTION_WHEN_NOT_TOPICS({ topicTitleKebabCase }))
    } else {
      this.store.dispatch(appActions.MAKE_SURE_SELECTED_TOPIC())
    }
  }



}
//#endregion

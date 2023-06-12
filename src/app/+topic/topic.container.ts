//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import { Observable, firstValueFrom, map, of, tap } from 'rxjs';
import { AppService, appActions, appSelectors } from '../../app.store';
import { TopicService } from './services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { _ } from 'tnp-core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss']
})
export class TopicContainer {
  constructor(
    private store: Store<TopicInitialState>,
    private service: TopicService,
    private route: ActivatedRoute,
  ) { }

  current$ = this.store.select(appSelectors.selectedTopic);
  selectedQuestionOid$ = this.store.select(topicSelectors.getSelectedQuestionOid);

  @Input('topicTitleKebabCase')
  set title(topicTitleKebabCase: string) {
    if (topicTitleKebabCase) {
      this.store.dispatch(topicAction.INIT_QUESTION_WHEN_NOT_TOPICS({ topicTitleKebabCase }))
    } else {
      this.store.dispatch(appActions.MAKE_SURE_SELECTED_TOPIC())
    }
  }

  async onQuestionOidChanged(navigateToQuestionOid) {
    const topic = await firstValueFrom(this.current$);
    this.service.appService.go(topic.topicTitleKebabCase, navigateToQuestionOid);
  }

  submit() {

  }
}
//#endregion

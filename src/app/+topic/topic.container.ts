//#region @browser
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import { Observable, firstValueFrom, map, of, takeUntil, tap } from 'rxjs';
import { AppService, appActions, appSelectors } from '../../app.store';
import { TopicService } from './services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { _ } from 'tnp-core';
import { Topic } from '../../lib';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss']
})
export class TopicContainer {
  @ViewChild('usernamePopup') usernamePopup: any;

  constructor(
    private store: Store<TopicInitialState>,
    private service: TopicService,
    private route: ActivatedRoute,
    private updates$: Actions,
  ) {
    updates$.pipe(
      ofType(topicAction.SHOW_ENTER_USERNAME),
      takeUntilDestroyed()
    ).subscribe(() => {
      this.usernamePopup.fire();
    });
  }

  current$ = this.store.select(appSelectors.selectedTopic).pipe(map(t => Topic.from(t)));
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

  submit(topic: Topic) {
    this.store.dispatch(topicAction.SHOW_ENTER_USERNAME({ topic }))
  }

  handleDismiss() {
    this.store.dispatch(topicAction.DISMISS_ENTER_USERNAME());
  }

  emailEntered(username) {
    this.store.dispatch(topicAction.SUBMIT_SCORE({ username }))
  }
}
//#endregion

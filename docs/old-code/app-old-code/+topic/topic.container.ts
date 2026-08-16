//#region imports
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question, Topic } from '@darekf77/application-quiz/src';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom, map, of, takeUntil, tap } from 'rxjs';
import { _ } from 'tnp-core/src';

import { AppService, appActions, appSelectors } from '../../app.store';

import * as questionAction from './+question/actions/question.actions';
import * as questionSelectors from './+question/selectors/question.selectors';
import * as topicAction from './actions/topic.actions';
import * as topicSelectors from './selectors/topic.selectors';
import { TopicService } from './services/topic.service';
import { TopicInitialState } from './topic.models';
//#endregion

@Component({
  selector: 'app-topic',
  standalone: false,
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss'],
})
export class TopicContainer implements OnInit {
  @ViewChild('usernamePopup')
  usernamePopup: any;

  readonly currentTopic$: Observable<Topic>;

  readonly currentQuestion$: Observable<Question>;

  readonly selectedQuestionOid$: Observable<number>;

  constructor(
    private store: Store<TopicInitialState>,
    private service: TopicService,
    private route: ActivatedRoute,
    private updates$: Actions,
  ) {
    updates$ // TODO destroy @LAST
      .pipe(ofType(topicAction.SHOW_ENTER_USERNAME))
      .subscribe(() => {
        this.usernamePopup.fire();
      });
    this.currentTopic$ = store.select(appSelectors.selectedTopic).pipe(
      map(t => {
        return t && new Topic().clone(t);
      }),
    );
    this.currentQuestion$ = store
      .select(questionSelectors.getCurrentQuestion)
      .pipe(
        map(t => {
          return t && new Question().clone(t);
        }),
      );
    this.selectedQuestionOid$ = store.select(
      topicSelectors.getSelectedQuestionOid,
    );
  }

  async onQuestionOidChanged(navigateToQuestionOid) {
    const topic = await firstValueFrom(this.currentTopic$);
    this.service.appService.go(
      topic.topicTitleKebabCase,
      navigateToQuestionOid,
    );
  }

  start() {
    this.store.dispatch(topicAction.FETCH_TOPIC());
  }

  submit(topic: Topic) {
    this.store.dispatch(topicAction.SHOW_ENTER_USERNAME({ topic }));
  }

  handleDismiss() {
    this.store.dispatch(topicAction.DISMISS_ENTER_USERNAME());
  }

  emailEntered(username) {
    this.store.dispatch(topicAction.SUBMIT_SCORE({ username }));
  }

  ngOnInit(): void {
    this.store.dispatch(questionAction.INIT());
  }
}

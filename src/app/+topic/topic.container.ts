//#region @browser
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import * as questionAction from './+question/actions/question.actions';
import { Observable, firstValueFrom, map, of, takeUntil, tap } from 'rxjs';
import { AppService, appActions, appSelectors } from '../../app.store';
import { TopicService } from './services/topic.service';
import { ActivatedRoute } from '@angular/router';
import { _ } from 'tnp-core/src';
import { Question, Topic } from 'application-quiz/src';
import { Actions, ofType } from '@ngrx/effects';
import * as questionSelectors from './+question/selectors/question.selectors';

@Component({
  selector: 'app-topic',
  standalone: false,
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss'],
})
export class TopicContainer {
  @ViewChild('usernamePopup') usernamePopup: any;

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
  }

  currentTopic$ = this.store.select(appSelectors.selectedTopic).pipe(
    map(t => {
      return t && Topic.from(t);
    }),
  );

  currentQuestion$ = this.store
    .select(questionSelectors.getCurrentQuestion)
    .pipe(
      map(t => {
        return t && Question.from(t);
      }),
    );

  selectedQuestionOid$ = this.store.select(
    topicSelectors.getSelectedQuestionOid,
  );

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
//#endregion

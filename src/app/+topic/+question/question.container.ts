//#region imports
import { Component, Input, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Answer, ITopic, Question } from '@darekf77/application-quiz/src';
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom, map, of, share, tap } from 'rxjs';
import { _ } from 'tnp-core/src';

import { AppService, appActions, appSelectors } from '../../../app.store';

import * as questionAction from './actions/question.actions';
import { QuestionInitialState } from './question.models';
import * as questionSelectors from './selectors/question.selectors';
//#endregion
@Component({
  selector: 'app-question',
  standalone: false,
  templateUrl: './question.container.html',
  styleUrls: ['./question.container.scss'],
})
export class QuestionContainer {
  question$: Observable<Question>;
  readonly selectedAnswersForQuestion$: Observable<number[]>;
  constructor(
    private store: Store<QuestionInitialState>,
    private appService: AppService,
  ) {
    this.selectedAnswersForQuestion$ = store.select(
      questionSelectors.currentQuestionSelectedIds,
    );
  }
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('questionOid')
  set id(questionOid) {
    if (!_.isNil(questionOid)) {
      questionOid = Number(questionOid);
    }
    if (_.isNumber(questionOid) && !_.isNaN(questionOid)) {
      this.question$ = this.store
        .select(questionSelectors.getCurrentQuestion)
        .pipe(map(q => Question.from(q)));
      this.store.dispatch(questionAction.FETCH_QUESTION({ questionOid }));
    } else {
      this.question$ = of(void 0);
    }
  }
  onSelectionChange(e: MatSelectionListChange) {
    const answersIds = e.source._value as any as Number[];
    this.store.dispatch(questionAction.MARK_ANSWERS({ answersIds }));
  }
  async goNext(q: Question) {
    const topic = await firstValueFrom(
      this.store.select(appSelectors.selectedTopic),
    );
    this.appService.go(topic.topicTitleKebabCase, q.nextOid);
  }
  async goPrev(q: Question) {
    const topic = await firstValueFrom(
      this.store.select(appSelectors.selectedTopic),
    );
    this.appService.go(topic.topicTitleKebabCase, q.prevOid);
  }
}
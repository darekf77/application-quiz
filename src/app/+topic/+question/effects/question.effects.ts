import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Question, Topic } from 'application-quiz/src';
import { QuestionController } from 'application-quiz/src';
import {
  switchMap,
  map,
  of,
  catchError,
  withLatestFrom,
  throttleTime,
} from 'rxjs';
import { Taon } from 'taon/src';

import { ApplicationQuizContext } from '../../../../app.context';
import { AppState, appSelectors } from '../../../../app.store';
import * as questionActions from '../actions/question.actions';
@Injectable()
export class QuestionEffects {
  questionController = Taon.inject(() =>
    ApplicationQuizContext.getClass(QuestionController),
  );
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {}
  fetchQuestions = createEffect(() =>
    this.actions$.pipe(
      ofType(questionActions.FETCH_QUESTION),
      throttleTime(1000),
      withLatestFrom(this.store.select(appSelectors.selectedTopic)),
      switchMap(([{ questionOid }, topic]) => {
        const { topicTitleKebabCase } = topic;
        return this.questionController
          .getQuestionWithAswers(questionOid, topicTitleKebabCase)
          .received.observable.pipe(
            map(data => {
              const question = data.body.rawJson;
              return questionActions.FETCH_QUESTION_SUCCESS({ question });
            }),
            catchError(error => {
              return of(questionActions.FETCH_QUESTION_ERROR({ error }));
            }),
          );
      }),
    ),
  );
}

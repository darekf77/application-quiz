//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as questionActions from '../actions/question.actions';
import {
  switchMap,
  map,
  of,
  catchError,
  withLatestFrom,
  throttleTime,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { Question, Topic } from 'application-quiz/src';
import { AppState, appSelectors } from '../../../../app.store';
import { ApplicationQuizContext } from '../../../../app.context';
import { QuestionController } from 'application-quiz/src';
import { Firedev } from 'firedev/src';

@Injectable()
export class QuestionEffects {
  questionController = Firedev.inject(() =>
    ApplicationQuizContext.get(QuestionController),
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/typedef
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
//#endregion

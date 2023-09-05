//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as questionActions from '../actions/question.actions'
import { switchMap, map, of, catchError, withLatestFrom, throttleTime } from "rxjs";
import { Store } from '@ngrx/store';
import { Question, Topic } from 'application-quiz';
import { AppState, appSelectors } from '../../../../app.store';

@Injectable()
export class QuestionEffects {
  constructor(private actions$: Actions, private store: Store<AppState>) { }

  fetchQuestions = createEffect(() => this.actions$.pipe(
    ofType(questionActions.FETCH_QUESTION),
    throttleTime(1000),
    withLatestFrom(this.store.select(appSelectors.selectedTopic)),
    switchMap(([{ questionOid }, topic]) => {
      const { topicTitleKebabCase } = topic;
      return Question.ctrl.getQuestionWithAswers(questionOid, topicTitleKebabCase).received.observable.pipe(
        map(data => {
          const question = data.body.rawJson
          return questionActions.FETCH_QUESTION_SUCCESS({ question })
        }),
        catchError((error) => {
          return of(questionActions.FETCH_QUESTION_ERROR({ error }));
        }),
      )

    })
  ));

}
//#endregion

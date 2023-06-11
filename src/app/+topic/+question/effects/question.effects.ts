//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as questionActions from '../actions/question.actions'
import { switchMap, map, of } from "rxjs";
import { QuestionService } from '../services/question.service';
import { Store } from '@ngrx/store';
import { QuestionInitialState } from '../question.models';

@Injectable()
export class QuestionEffects {
  constructor(private actions$: Actions, private service: QuestionService, private store: Store<QuestionInitialState>) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(questionActions.INIT),
    switchMap(() => of(questionActions.FETCH()))
  ));

}
//#endregion
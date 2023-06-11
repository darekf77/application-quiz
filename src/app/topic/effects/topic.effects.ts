//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as topicActions from '../actions/topic.actions'
import { switchMap, map, of } from "rxjs";
import { TopicService } from '../services/topic.service';
import { Store } from '@ngrx/store';
import { TopicInitialState } from '../topic.models';

@Injectable()
export class TopicEffects {
  constructor(private actions$: Actions, private service: TopicService, private store: Store<TopicInitialState>) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(topicActions.INIT),
    switchMap(() => of(topicActions.FETCH()))
  ));

}
//#endregion
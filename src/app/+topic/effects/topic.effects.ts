//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as topicActions from '../actions/topic.actions'
import { switchMap, map, of, tap, catchError, debounce, throttleTime } from "rxjs";
import { TopicService } from '../services/topic.service';
import { Store } from '@ngrx/store';
import { TopicInitialState } from '../topic.models';
import { Topic } from '../../../lib';

@Injectable()
export class TopicEffects {
  constructor(private actions$: Actions, private service: TopicService) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(topicActions.INIT),
    switchMap(({ topicTitleKebakCase }) => of(topicActions.FETCH_TOPIC({ topicTitleKebakCase })))
  ));

  fetchTopic = createEffect(() => this.actions$.pipe(
    ofType(topicActions.FETCH_TOPIC),
    switchMap(({ topicTitleKebakCase }) =>
      Topic.ctrl.getByTitle(topicTitleKebakCase).received.observable.pipe(
        map(data => {
          const topic = data.body.rawJson;
          console.log({
            topic
          })
          return topicActions.FETCH_TOPIC_SUCCESS({ topic })
        }),
        catchError((error) => {
          return of(topicActions.FETCH_TOPIC_ERROR({ error }));
        }),
      ))
  ));

  navigateToQuesiton = createEffect(() => this.actions$.pipe(
    ofType(topicActions.FETCH_TOPIC_SUCCESS),
    throttleTime(1000),
    tap(({ topic }) => {
      this.service.navigateToFirstQuestion(Topic.from(topic));
    })
  ));

}
//#endregion

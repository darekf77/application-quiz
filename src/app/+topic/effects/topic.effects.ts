//#region @browser
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as topicActions from '../actions/topic.actions';
import * as topicSelectors from '../selectors/topic.selectors';
import * as questionSelectors from '../+question/selectors/question.selectors';
import {
  switchMap,
  map,
  of,
  tap,
  catchError,
  debounce,
  throttleTime,
  exhaustMap,
  withLatestFrom,
  concatMap,
} from 'rxjs';
import { TopicService } from '../services/topic.service';
import { Store } from '@ngrx/store';
import { TopicInitialState } from '../topic.models';
import { Topic, User } from 'application-quiz/src';
import { appSelectors } from '../../../app.store';
import { Taon } from 'taon/src';
import { UserController } from 'application-quiz/src';
import { ApplicationQuizContext } from '../../../app.context';
import { TopicController } from 'application-quiz/src';

@Injectable()
export class TopicEffects {
  // eslint-disable-next-line @typescript-eslint/typedef
  userController = Taon.inject(() =>
    ApplicationQuizContext.getClass(UserController),
  );

  topicController = Taon.inject(() =>
    ApplicationQuizContext.getClass(TopicController),
  );

  constructor(
    private actions$: Actions,
    private service: TopicService,
    private store: Store<TopicInitialState>,
  ) {}

  fetchTopic = createEffect(() =>
    this.actions$.pipe(
      ofType(topicActions.FETCH_TOPIC),
      concatMap(action =>
        of(action).pipe(
          withLatestFrom(this.store.select(appSelectors.selectedTopic)),
          switchMap(([action, { topicTitleKebabCase }]) =>
            this.topicController
              .getByTitleKebabCase(topicTitleKebabCase)
              .received.observable.pipe(
                map(data => {
                  const topic = data.body.rawJson;
                  return topicActions.FETCH_TOPIC_SUCCESS({ topic });
                }),
                catchError(error => {
                  return of(topicActions.FETCH_TOPIC_ERROR({ error }));
                }),
              ),
          ),
        ),
      ),
    ),
  );

  navigateToQuestion = createEffect(
    () =>
      this.actions$.pipe(
        ofType(topicActions.FETCH_TOPIC_SUCCESS),
        throttleTime(1000),
        tap(({ topic }) => {
          this.service.appService.navigateToFirstQuestion(Topic.from(topic));
        }),
      ),
    { dispatch: false },
  );

  // eslint-disable-next-line @typescript-eslint/typedef
  submit = createEffect(() =>
    this.actions$.pipe(
      ofType(topicActions.SUBMIT_SCORE),
      withLatestFrom(
        this.store.select(topicSelectors.getTopicToSubmit),
        this.store.select(questionSelectors.currentQuestionSelectedIds),
      ),
      exhaustMap(([{ username }, topic, anwsersIds]) => {
        return this.userController
          .submit(
            anwsersIds,
            encodeURIComponent(username),
            topic ? topic.id : void 0,
          )
          .received.observable.pipe(
            map(data => {
              const user = data.body.rawJson;
              return topicActions.SUBMIT_SCORE_SUCCESS({ user });
            }),
            catchError(error => {
              return of(topicActions.SUBMIT_SCORE_ERROR({ error }));
            }),
          );
      }),
    ),
  );

  navigateToUserStats = createEffect(
    () =>
      this.actions$.pipe(
        ofType(topicActions.SUBMIT_SCORE_SUCCESS),
        tap(({ user }) => {
          this.service.appService.goToStats(user.username);
        }),
      ),
    { dispatch: false },
  );
}
//#endregion

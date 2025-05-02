//#region constants
const appStateKey = 'app';
const appRouterStateKey = 'router';
const initialState: InitialAppState = {
  topics: [],
};
//#endregion
//#region imports
import { Injectable } from '@angular/core';
import { Params, Router, RouterStateSnapshot } from '@angular/router';
import { ITopic, Topic } from '@darekf77/application-quiz/src';
import { TopicController } from '@darekf77/application-quiz/src';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  RouterReducerState,
  RouterStateSerializer,
  getRouterSelectors,
} from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  Store,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
  select,
} from '@ngrx/store';
import {
  switchMap,
  map,
  of,
  exhaustMap,
  catchError,
  retry,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { ApplicationQuizContext } from './app.context';

//#endregion
//#region models
export interface InitialAppState {
  topics: ITopic[];
}
export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
}
export interface AppState {
  app: InitialAppState;
  router: RouterReducerState<RouterState>;
}
//#endregion
//#region router serializer
export class RouterSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    let route = routerState.root;
    let params = {};
    while (true) {
      params = {
        ...params,
        ...route.params,
      };
      route = route.firstChild;
      if (!route) {
        break;
      }
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const routerData = { url, params, queryParams };
    return routerData;
  }
}
//#endregion
//#region app actions
export namespace appActions {
  export const LOGOUT = createAction('[app] LOGOUT');
  export const INIT = createAction('[app] INIT');
  export const CHANGE_TOPIC = createAction(
    '[app] CHANGE_TOPIC',
    props<{
      topicTitleKebabCase: string;
    }>(),
  );
  //#region app actions / FETCH_TOPICS
  export const FETCH_TOPICS = createAction('[app] FETCH_TOPICS');
  export const FETCH_TOPICS_SUCCESS = createAction(
    '[app] FETCH_TOPICS_SUCCESS',
    props<{
      topics: ITopic[];
    }>(),
  );
  export const FETCH_TOPICS_ERROR = createAction(
    '[app] FETCH_TOPICS_ERROR',
    props<{
      error: any;
    }>(),
  );
  //#endregion
}
//#endregion
//#region app service
@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private router: Router) {}
  go(topicTitleKebabCase: string, questionOid?: number) {
    const urlToNavigate = `/quiz/topic/${topicTitleKebabCase}${questionOid ? `/question/num/${questionOid}` : ''}`;
    console.log('Navigating to:', urlToNavigate);
    this.router.navigateByUrl(urlToNavigate);
  }
  goToStats(username: string) {
    const urlToNavigate = `/stats/${encodeURIComponent(username)}`;
    this.router.navigateByUrl(urlToNavigate);
  }
  navigateToFirstQuestion(topic: Topic) {
    setTimeout(() => {
      this.go(topic.topicTitleKebabCase, 1);
    });
  }
  goTo(topicTitleKebabCase: string) {
    this.go(topicTitleKebabCase);
  }
}
//#endregion
//#region app reducers
export const appReducer = createReducer(
  initialState,
  on(appActions.FETCH_TOPICS_SUCCESS, (state, { topics }) => {
    return { ...state, topics: _.cloneDeep(topics) };
  }),
);
//#endregion
//#region app effects
@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private service: AppService,
  ) {}
  init = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.INIT),
      switchMap(() => of(appActions.FETCH_TOPICS())),
    ),
  );

  topicController = Taon.inject(() =>
    ApplicationQuizContext.getClass(TopicController),
  );

  fetchTasks = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.FETCH_TOPICS),
      switchMap(() => {
        return this.topicController.getAll().received.observable.pipe(
          map(data => {
            return appActions.FETCH_TOPICS_SUCCESS({
              topics: data.body.rawJson,
            });
          }),
          catchError(error => {
            return of(appActions.FETCH_TOPICS_ERROR({ error }));
          }),
        );
      }),
    ),
  );
  naivigateToTopic = createEffect(
    () =>
      this.actions$.pipe(
        ofType(appActions.CHANGE_TOPIC),
        tap(({ topicTitleKebabCase }) => {
          this.service.goTo(topicTitleKebabCase);
        }),
      ),
    { dispatch: false },
  );
}
//#endregion
//#region app selectors
export namespace appSelectors {
  export const appSelector =
    createFeatureSelector<InitialAppState>(appStateKey);
  export const appRouterSelector =
    createFeatureSelector<RouterReducerState<RouterState>>(appRouterStateKey);
  export const selectedTopic = createSelector(
    appSelector,
    appRouterSelector,
    (state, route) => {
      const topicTitleFromParam = route?.state?.params['topicTitleKebabCase'];
      if (topicTitleFromParam) {
        const selectedTopic = (state.topics || []).find(
          ({ topicTitleKebabCase }) =>
            topicTitleKebabCase === topicTitleFromParam,
        ) as ITopic;
        return selectedTopic;
      }
      return void 0;
    },
  );
  export const allTopics = createSelector(appSelector, state => {
    return state.topics || [];
  });
  export const showQuizSelect = createSelector(appRouterSelector, state => {
    return state?.state?.url?.startsWith('/quiz');
  });
}
//#endregion
//#region meta reducers
export const reducers: ActionReducerMap<AppState> = {
  [appStateKey]: appReducer,
  [appRouterStateKey]: routerReducer,
};
const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    // things for debugging
    return reducer(state, action);
  };
};
const logoutMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    if (action?.type === appActions.LOGOUT.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};
export const metaReducers: MetaReducer<AppState>[] = (window['ENV'] as any)
  .angularProd
  ? [logoutMeta]
  : [debugMeta, logoutMeta];
//#endregion

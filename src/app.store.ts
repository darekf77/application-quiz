//#region @browser
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, of, exhaustMap, catchError, retry } from "rxjs";
import { _ } from 'tnp-core';
import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from '@ngrx/store';
import { Models } from 'tnp-models';
import { ITopic, Topic } from './lib';



export interface InitialAppState {
  topics: ITopic[];
  selectedTopic: ITopic;
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


export class RouterSerializer implements RouterStateSerializer<RouterState> {
  serialize(routerState: RouterStateSnapshot): RouterState {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }
    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params } = route;
    return { url, params, queryParams };
  }
}


export namespace appActions {
  export const LOGOUT = createAction('[app] LOGOUT');
  export const INIT = createAction('[app] INIT');
  export const SELECT_FIRST_TOPIC = createAction('[app] SELECT_FIRST_TOPIC');
  export const FETCH_TOPICS = createAction(
    '[app] FETCH_TOPICS',
  );

  export const CHANGE_TOPIC = createAction(
    '[app] CHANGE_TOPIC',
    props<{ topic: Topic }>()
  );

  export const FETCH_TOPICS_SUCCESS = createAction(
    '[app] FETCH_TOPICS_SUCCESS',
    props<{ topics: ITopic[] }>()
  );
  export const FETCH_TOPICS_ERROR = createAction(
    '[app] FETCH_TOPICS_ERROR',
    props<{ error: any; }>()
  );
}

const initialState: InitialAppState = {
  topics: [],
  selectedTopic: void 0,
};

export const appReducer = createReducer(
  initialState,
  on(appActions.FETCH_TOPICS_SUCCESS,
    (state, { topics }) => {
      return { ...state, topics: _.cloneDeep(topics) };
    }),
  on(appActions.SELECT_FIRST_TOPIC,
    (state) => {
      const selectedTopic = _.cloneDeep(_.first(state.topics));
      return { ...state, selectedTopic };
    }),
  on(appActions.CHANGE_TOPIC,
    (state, { topic }) => {
      const selectedTopic = _.cloneDeep(topic);
      return { ...state, selectedTopic };
    })
);

const appStateKey = 'app';
const appRouterStateKey = 'router';

export const reducers: ActionReducerMap<AppState> = {
  [appStateKey]: appReducer,
  [appRouterStateKey]: routerReducer
};

const debugMeta = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return (state, action) => {
    console.log('state', state);
    console.log('action', action);

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

export const metaReducers: MetaReducer<AppState>[] = (window['ENV'] as Models.env.EnvConfig).angularProd
  ? [logoutMeta]
  : [debugMeta, logoutMeta];

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions
  ) { }

  init = createEffect(() => this.actions$.pipe(
    ofType(appActions.INIT),
    switchMap(() => of(appActions.FETCH_TOPICS()))
  ));

  fetchTasks = createEffect(() => this.actions$.pipe(
    ofType(appActions.FETCH_TOPICS),
    switchMap(() =>
      Topic.ctrl.getAll().received.observable.pipe(
        map(data => {
          return appActions.FETCH_TOPICS_SUCCESS({ topics: data.body.rawJson })
        }),
        catchError((error) => {
          return of(appActions.FETCH_TOPICS_ERROR({ error }));
        }),
      ))
  ));

  // selectFirstTopic = createEffect(() => this.actions$.pipe(
  //   ofType(appActions.FETCH_TOPICS_SUCCESS),
  //   switchMap(() => of(appActions.SELECT_FIRST_TOPIC()))
  // ));


}

const appSelector = createFeatureSelector<InitialAppState>(appStateKey);
const appRouterSelector = createFeatureSelector<RouterReducerState<RouterState>>(appRouterStateKey);

export namespace appSelectors {

  export const allTopics = createSelector(appSelector, state => {
    return (state.topics || []).map(t => Topic.from(t))
  });

  export const selectedTopic = createSelector(appSelector, state => {
    return Topic.from(state.selectedTopic);
  });

  export const showQuizSelect = createSelector(appRouterSelector, state => {
    return state.state.url?.startsWith('/quiz');
  });
}



//#endregion

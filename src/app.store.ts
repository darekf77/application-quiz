//#region @browser

//#region constants
const appStateKey = 'app';
const appRouterStateKey = 'router';

const initialState: InitialAppState = {
  topics: [],
};
//#endregion

//#region imports
import { Params, Router, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, RouterStateSerializer, getRouterSelectors } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, of, exhaustMap, catchError, retry, tap, withLatestFrom } from "rxjs";
import { _ } from 'tnp-core';
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
import { Models } from 'tnp-models';
import { ITopic, Topic } from './lib';
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
    let params = {}

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
      root: { queryParams }
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
    props<{ topicTitleKebabCase: string }>()
  );

  export const DUMMYACTION = createAction(
    '[app] DUMMYACTION',
  );

  export const MAKE_SURE_SELECTED_TOPIC = createAction(
    '[app] MAKE_SURE_SELECTED_TOPIC'
  );

  //#region app actions / FETCH_TOPICS
  export const FETCH_TOPICS = createAction(
    '[app] FETCH_TOPICS',
  );

  export const FETCH_TOPICS_SUCCESS = createAction(
    '[app] FETCH_TOPICS_SUCCESS',
    props<{ topics: ITopic[] }>()
  );
  export const FETCH_TOPICS_ERROR = createAction(
    '[app] FETCH_TOPICS_ERROR',
    props<{ error: any; }>()
  );
  //#endregion

}
//#endregion

//#region app service
@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(
    private router: Router
  ) {

  }

  go(topicTitleKebabCase: string, questionOid?: number) {
    const urlToNavigate = `/quiz/topic/${topicTitleKebabCase}${questionOid ? `/question/num/${questionOid}` : ''}`
    this.router.navigateByUrl(urlToNavigate);
  }

  navigateToFirstQuestion(topic: Topic) {
    setTimeout(() => {
      this.go(topic.topicTitleKebabCase, 1);
    })
  }

  goTo(topicTitleKebabCase: string) {
    this.go(topicTitleKebabCase);
  }
}
//#endregion

//#region app reducers
export const appReducer = createReducer(
  initialState,
  on(appActions.FETCH_TOPICS_SUCCESS,
    (state, { topics }) => {
      return { ...state, topics: _.cloneDeep(topics) };
    })
);
//#endregion

//#region app effects
@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private service: AppService,
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

  selectAutomaticallyFirstTopic = createEffect(() => this.actions$.pipe(
    ofType(appActions.FETCH_TOPICS_SUCCESS, appActions.MAKE_SURE_SELECTED_TOPIC),
    withLatestFrom(
      this.store.select(appSelectors.allTopics),
      this.store.select(appSelectors.selectedTopic),
    ),
    tap(([state, topics, selectedTopic]) => {
      if (!selectedTopic) {
        selectedTopic = _.first(topics);
        const { topicTitleKebabCase } = selectedTopic;
        this.service.goTo(topicTitleKebabCase);
      }
    })
  ), { dispatch: false });

  naivigateToTopic = createEffect(() => this.actions$.pipe(
    ofType(appActions.CHANGE_TOPIC),
    tap(({ topicTitleKebabCase }) => {
      this.service.goTo(topicTitleKebabCase);
    })
  ), { dispatch: false });

}
//#endregion

//#region app selectors



export namespace appSelectors {

  export const appSelector = createFeatureSelector<InitialAppState>(appStateKey);
  export const appRouterSelector = createFeatureSelector<RouterReducerState<RouterState>>(appRouterStateKey);

  // export const {
  //   selectCurrentRoute, // select the current route
  //   selectFragment, // select the current route fragment
  //   selectQueryParams, // select the current route query params
  //   selectQueryParam, // factory function to select a query param
  //   selectRouteParams, // select the current route params
  //   selectRouteParam, // factory function to select a route param
  //   selectRouteData, // select the current route data
  //   selectUrl, // select the current url
  // } = getRouterSelectors(appRouterSelector);

  export const selectedTopic = createSelector(
    appSelector,
    appRouterSelector,
    (state, route) => {
      const selectedTopic = (state.topics || [])
        .find(({ topicTitleKebabCase }) => topicTitleKebabCase === route?.state?.params['topicTitleKebabCase']) as ITopic;
      return selectedTopic;
    }
  );

  export const allTopics = createSelector(appSelector, state => {
    return (state.topics || []);
  });

  export const showQuizSelect = createSelector(appRouterSelector, state => {
    return state?.state?.url?.startsWith('/quiz');
  });
}
//#endregion

//#region meta reducers
export const reducers: ActionReducerMap<AppState> = {
  [appStateKey]: appReducer,
  [appRouterStateKey]: routerReducer
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

export const metaReducers: MetaReducer<AppState>[] = (window['ENV'] as Models.env.EnvConfig).angularProd
  ? [logoutMeta]
  : [debugMeta, logoutMeta];
//#endregion


//#endregion

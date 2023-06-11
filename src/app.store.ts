//#region @browser
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
  createAction,
} from '@ngrx/store';
import { Models } from 'tnp-models';
import { ITopic } from './lib';

export interface AppState {

}

export interface RouterState {
  url: string;
  params: Params;
  queryParams: Params;
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


export const logout = createAction('[User] logout');

export const reducers: ActionReducerMap<AppState> = {

  router: routerReducer
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
    if (action?.type === logout.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<AppState>[] = (window['ENV'] as Models.env.EnvConfig).angularProd
  ? [logoutMeta]
  : [debugMeta, logoutMeta];
//#endregion

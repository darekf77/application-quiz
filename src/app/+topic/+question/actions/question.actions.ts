//#region @browser
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[question] INIT'
);

export const FETCH = createAction(
  '[question] FETCH',
);

export const FETCH_SUCCESS = createAction(
  '[question] FETCH_SUCCESS',
);

export const FETCH_ERROR = createAction(
  '[question] FETCH_ERROR',
  props<{ error?: any }>()
);

export const UNDO = createAction(
  '[question] UNDO',
  props<{ data?: any }>()
);

//#endregion
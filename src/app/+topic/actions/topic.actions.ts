//#region @browser
import { createAction, props } from "@ngrx/store";

export const INIT = createAction(
  '[topic] INIT'
);

export const FETCH = createAction(
  '[topic] FETCH',
);

export const FETCH_SUCCESS = createAction(
  '[topic] FETCH_SUCCESS',
);

export const FETCH_ERROR = createAction(
  '[topic] FETCH_ERROR',
  props<{ error?: any }>()
);

export const UNDO = createAction(
  '[topic] UNDO',
  props<{ data?: any }>()
);

//#endregion
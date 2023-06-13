//#region @browser
import { createAction, props } from "@ngrx/store";
import { ITopic, IUser, Topic } from "../../../lib";

export const INIT = createAction(
  '[topic]  INIT'
);

export const FETCH_TOPIC = createAction(
  '[topic] FETCH_TOPIC'
);

export const FETCH_TOPIC_SUCCESS = createAction(
  '[topic] FETCH_TOPIC_SUCCESS',
  props<{ topic: ITopic; }>()
);

export const FETCH_TOPIC_ERROR = createAction(
  '[topic] FETCH_TOPIC_ERROR',
  props<{ error: any }>()
);

export const SHOW_ENTER_USERNAME = createAction(
  '[question] SHOW_ENTER_USERNAME',
  props<{ topic?: Topic; }>()
);

export const DISMISS_ENTER_USERNAME = createAction(
  '[question] DISMISS_ENTER_USERNAME'
);

export const SUBMIT_SCORE = createAction(
  '[question] SUBMIT_SCORE',
  props<{ username: string; }>()
);

export const SUBMIT_SCORE_SUCCESS = createAction(
  '[question] SUBMIT_SCORE_SUCCESS',
  props<{ user: IUser; }>()
);

export const SUBMIT_SCORE_ERROR = createAction(
  '[question] SUBMIT_SCORE_ERROR',
  props<{ error?: any }>()
);



//#endregion

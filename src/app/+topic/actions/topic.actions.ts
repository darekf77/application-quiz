//#region @browser
import { createAction, props } from "@ngrx/store";
import { ITopic, Topic } from "../../../lib";


export const INIT = createAction(
  '[topic] INIT',
  props<{ topicTitleKebakCase: string; }>()
);

export const FETCH_TOPIC = createAction(
  '[topic] FETCH_TOPIC',
  props<{ topicTitleKebakCase: string; }>()
);

export const FETCH_TOPIC_SUCCESS = createAction(
  '[topic] FETCH_TOPIC_SUCCESS',
  props<{ topic: ITopic; }>()
);

export const FETCH_TOPIC_ERROR = createAction(
  '[topic] FETCH_TOPIC_ERROR',
  props<{ error: any }>()
);


//#endregion

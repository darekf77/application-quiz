//#region @browser
import { createAction, props } from "@ngrx/store";
import { ITopic, Topic } from "../../../lib";


export const INIT_QUESTION_WHEN_NOT_TOPICS = createAction(
  '[topic] INIT_QUESTION_WHEN_NOT_TOPICS',
  props<{ topicTitleKebabCase: string; }>()
);

export const FETCH_TOPIC = createAction(
  '[topic] FETCH_TOPIC',
  props<{ topicTitleKebabCase: string; }>()
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

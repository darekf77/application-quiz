//#region @browser
import { createAction, props } from "@ngrx/store";
import { ITopic, IUser, Topic } from "../../../lib";


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

export const SHOW_ENTER_USERNAME = createAction(
  '[question] SHOW_ENTER_USERNAME'
);

export const SUBMIT_SCORE = createAction(
  '[question] SUBMIT_SCORE',
  props<{ username: string; onlyTopic?: Number[]; }>()
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

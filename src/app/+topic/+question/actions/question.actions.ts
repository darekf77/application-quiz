//#region @browser
import { createAction, props } from "@ngrx/store";
import { IQuestion } from "../../../../lib";

export const INIT = createAction(
  '[question] INIT',
);

export const FETCH_QUESTION = createAction(
  '[question] FETCH_QUESTION',
  props<{ questionOid: number; topicTitleKebabCase: string; }>()
);

export const FETCH_QUESTION_SUCCESS = createAction(
  '[question] FFETCH_QUESTION_SUCCESS',
  props<{ question: IQuestion }>()
);

export const FETCH_QUESTION_ERROR = createAction(
  '[question] FETCH_QUESTION_ERROR',
  props<{ error?: any }>()
);


//#endregion

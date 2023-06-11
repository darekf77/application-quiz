//#region @browser
import { createAction, props } from "@ngrx/store";
import { IQuestion } from "../../../../lib";

export const INIT = createAction(
  '[question] INIT',
);

export const FETCH_QUESTIONS = createAction(
  '[question] FETCH_QUESTIONS',
  props<{ questionId: number; }>()
);

export const FETCH_QUESTIONS_SUCCESS = createAction(
  '[question] FETCH_QUESTIONS_SUCCESS',
  props<{ question: IQuestion }>()
);

export const FETCH_QUESTIONS_ERROR = createAction(
  '[question] FETCH_QUESTIONS_ERROR',
  props<{ error?: any }>()
);


//#endregion

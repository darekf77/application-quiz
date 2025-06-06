//#region imports
import { Answer, IAnswer, IQuestion } from '@darekf77/application-quiz/src';
import { createAction, props } from '@ngrx/store';
//#endregion
export const INIT = createAction('[question] INIT');
export const FETCH_QUESTION = createAction(
  '[question] FETCH_QUESTION',
  props<{
    questionOid: number;
  }>(),
);
export const FETCH_QUESTION_SUCCESS = createAction(
  '[question] FFETCH_QUESTION_SUCCESS',
  props<{
    question: IQuestion;
  }>(),
);
export const FETCH_QUESTION_ERROR = createAction(
  '[question] FETCH_QUESTION_ERROR',
  props<{
    error?: any;
  }>(),
);
export const MARK_ANSWERS = createAction(
  '[question] MARK_ANSWERS',
  props<{
    answersIds: Number[];
  }>(),
);
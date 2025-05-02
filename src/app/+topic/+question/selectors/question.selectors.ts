//#region imports
import { IAnswer } from '@darekf77/application-quiz/src';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { _ } from 'tnp-core/src';

import { questionFeatureKey, QuestionInitialState } from '../question.models';
//#endregion
const questionFeatureSelector =
  createFeatureSelector<QuestionInitialState>(questionFeatureKey);
export const getCurrentQuestion = createSelector(
  questionFeatureSelector,
  state => {
    return state?.currentQuestion;
  },
);
export const currentQuestionSelectedIds = createSelector(
  questionFeatureSelector,
  state => {
    return ((state?.currentQuestion?.answers as IAnswer[]) || [])
      .filter(a => {
        return state.selectedAnswersIds.includes(a.id);
      })
      .map(a => {
        return a.id;
      });
  },
);
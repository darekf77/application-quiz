import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAnswer } from 'application-quiz/src';
import { _ } from 'tnp-core/src';

import { questionFeatureKey, QuestionInitialState } from '../question.models';
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

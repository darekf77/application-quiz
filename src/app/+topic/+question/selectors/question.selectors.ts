//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionFeatureKey, QuestionInitialState } from '../question.models';

const questionFeatureSelector = createFeatureSelector<QuestionInitialState>(questionFeatureKey);

export const getCurrentQuestion = createSelector(questionFeatureSelector, state => {
  return state.currentQuestion;
});


//#endregion

//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionFeatureKey, QuestionInitialState } from '../question.models';

const questionFeatureSelector = createFeatureSelector<QuestionInitialState>(questionFeatureKey);

export const allBatches = createSelector(questionFeatureSelector, state => {
  return state.questionArr;
});


export const filterAllBatchesBy = (customerId: string) => {
  return createSelector(questionFeatureSelector, state => {
    return state.questionArr;
  });
}


export const allowedToUndo = createSelector(questionFeatureSelector, state => {
  return state.questionArr.length > 0;
});

//#endregion
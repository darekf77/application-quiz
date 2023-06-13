//#region @browser
import { _ } from 'tnp-core';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { questionFeatureKey, QuestionInitialState } from '../question.models';
import { IAnswer } from '../../../../lib';

const questionFeatureSelector = createFeatureSelector<QuestionInitialState>(questionFeatureKey);

export const getCurrentQuestion = createSelector(questionFeatureSelector, state => {
  return state.currentQuestion;
});

export const currentQuestionSelectedIds = createSelector(questionFeatureSelector, state => {
  return (state.currentQuestion?.answers as IAnswer[] || [])
    .filter(a => {
      return state.selectedAnswersIds.includes(a.id);
    })
    .map(a => {
      return a.id;
    });
});


//#endregion

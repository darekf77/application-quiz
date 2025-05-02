//#region imports
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import { Helpers } from 'tnp-helpers/src';

import { appActions } from '../../../../app.store';
import * as topicActions from '../../actions/topic.actions';
import * as questionActions from '../actions/question.actions';
import { QuestionInitialState } from '../question.models';
//#endregion
const initialState: QuestionInitialState = {
  currentQuestion: void 0,
  selectedAnswersIds: [],
  allAnswers: [],
};
export const questionReducer = createReducer(
  initialState,
  on(questionActions.INIT, state => {
    return { ...state, ...{ currentQuestion: null } };
  }),
  on(appActions.CHANGE_TOPIC, state => {
    return { ...state, ...{ currentQuestion: null } };
  }),
  on(questionActions.FETCH_QUESTION_SUCCESS, (state, { question }) => {
    const currentQuestion = _.cloneDeep(question);
    const allAnswers = _.cloneDeep(
      Helpers.arrays.uniqArray(
        [...state.allAnswers, ...question.answers],
        'id',
      ),
    );
    return { ...state, ...{ currentQuestion, allAnswers } };
  }),
  on(topicActions.SUBMIT_SCORE_SUCCESS, (state, action) => {
    const selectedAnswersIds = [];
    return { ...state, ...{ selectedAnswersIds } };
  }),
  on(questionActions.MARK_ANSWERS, (state, action) => {
    const selectedAnswersIds = _.cloneDeep(
      Helpers.arrays.uniqArray([
        ...state.selectedAnswersIds,
        ...action.answersIds,
      ]),
    );
    return { ...state, ...{ selectedAnswersIds } };
  }),
);
//#region @browser
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as questionActions from '../actions/question.actions'
import { QuestionInitialState } from '../question.models';
import { Helpers } from 'tnp-helpers';

const initialState: QuestionInitialState = {
  currentQuestion: void 0,
  selectedAnswersIds: [],
  allAnswers: [],
};

export const questionReducer = createReducer(
  initialState,
  on(
    questionActions.INIT,
    (state) => {
      return { ...state, ...{ currentQuestion: null } };
    }
  ),
  on(
    questionActions.FETCH_QUESTION_SUCCESS,
    (state, { question }) => {
      const currentQuestion = _.cloneDeep(question)
      const allAnswers = _.cloneDeep(Helpers.arrays.uniqArray([...state.allAnswers, ...question.answers], 'id'));
      return { ...state, ...{ currentQuestion, allAnswers } };
    }
  ),
  on(
    questionActions.MARK_ANSWERS,
    (state, action) => {
      const selectedAnswersIds = _.cloneDeep(Helpers.arrays.uniqArray([...state.selectedAnswersIds, ...action.answersIds]));
      return { ...state, ...{ selectedAnswersIds } };
    }
  ),
);
//#endregion

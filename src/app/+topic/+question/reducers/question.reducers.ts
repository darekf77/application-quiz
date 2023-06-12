//#region @browser
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as questionActions from '../actions/question.actions'
import { QuestionInitialState } from '../question.models';

const initialState: QuestionInitialState = {
  currentQuestion: void 0,
};

export const questionReducer = createReducer(
  initialState,
  on(
    questionActions.FETCH_QUESTION_SUCCESS,
    (state, { question }) => {
      return { ...state, ...{ currentQuestion: _.cloneDeep(question) } };
    }
  ),
);
//#endregion

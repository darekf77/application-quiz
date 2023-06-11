//#region @browser
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as questionActions from '../actions/question.actions'
import { QuestionInitialState } from '../question.models';

const initialState: QuestionInitialState = {
  questionArr: [],
};

export const questionReducer = createReducer(
  initialState,
  on(
    questionActions.FETCH_SUCCESS,
    (state) => {
      const newState = _.cloneDeep(state);
      return { ...state, ...newState };
    }
  ),
);
//#endregion
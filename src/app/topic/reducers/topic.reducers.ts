//#region @browser
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as topicActions from '../actions/topic.actions'
import { TopicInitialState } from '../topic.models';

const initialState: TopicInitialState = {
  topicArr: [],
};

export const topicReducer = createReducer(
  initialState,
  on(
    topicActions.FETCH_SUCCESS,
    (state) => {
      const newState = _.cloneDeep(state);
      return { ...state, ...newState };
    }
  ),
);
//#endregion
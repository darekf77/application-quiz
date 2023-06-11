//#region @browser
import { createReducer, on } from '@ngrx/store';
import * as _ from 'lodash';
import * as topicActions from '../actions/topic.actions'
import { TopicInitialState } from '../topic.models';

const initialState: TopicInitialState = {
  currentTopic: void 0
};

export const topicReducer = createReducer(
  initialState,
  on(
    topicActions.FETCH_TOPIC_SUCCESS,
    (state, { topic }) => {
      return { ...state, ...{ currentTopic: _.cloneDeep(topic) } };
    }
  ),
);
//#endregion

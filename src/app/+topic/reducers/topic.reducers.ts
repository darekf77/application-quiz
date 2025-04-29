import { createReducer, on } from '@ngrx/store';
import { _ } from 'tnp-core/src';

import * as topicActions from '../actions/topic.actions';
import { TopicInitialState } from '../topic.models';
const initialState: TopicInitialState = {
  currentTopic: void 0,
  showInputPopup: false,
  topicsToSubmit: void 0,
};
export const topicReducer = createReducer(
  initialState,
  on(topicActions.FETCH_TOPIC_SUCCESS, (state, { topic }) => {
    return { ...state, ...{ currentTopic: _.cloneDeep(topic) } };
  }),
  on(topicActions.SHOW_ENTER_USERNAME, (state, { topic }) => {
    return {
      ...state,
      ...{ showInputPopup: true, topicsToSubmit: _.cloneDeep(topic) },
    };
  }),
  on(topicActions.DISMISS_ENTER_USERNAME, state => {
    return { ...state, ...{ showInputPopup: false } };
  }),
);

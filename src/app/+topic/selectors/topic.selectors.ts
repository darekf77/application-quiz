import { createFeatureSelector, createSelector } from '@ngrx/store';

import { appSelectors } from '../../../app.store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';
const topicFeatureSelector =
  createFeatureSelector<TopicInitialState>(topicFeatureKey);
export const getCurrentTopic = createSelector(topicFeatureSelector, state => {
  return state?.currentTopic;
});
export const showInputPopup = createSelector(topicFeatureSelector, state => {
  return state?.showInputPopup;
});
export const getTopicToSubmit = createSelector(topicFeatureSelector, state => {
  return state?.topicsToSubmit;
});
export const getSelectedQuestionOid = createSelector(
  appSelectors.appRouterSelector,
  route => {
    const questionOid = Number(route.state.params['questionOid']);
    return questionOid;
  },
);

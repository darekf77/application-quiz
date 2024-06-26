//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';

import { appSelectors } from '../../../app.store';

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

//#endregion

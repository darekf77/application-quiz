//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';
import { Topic } from '../../../lib';
import { appSelectors } from '../../../app.store';

const topicFeatureSelector = createFeatureSelector<TopicInitialState>(topicFeatureKey);

export const getCurrentTopic = createSelector(topicFeatureSelector, state => {
  return state?.currentTopic;
});

export const getSelectedQuestionOid = createSelector(
  appSelectors.appRouterSelector,
  (route) => {
    console.log(route.state.params)
    return route.state.params['questionOid'];
  }
);


//#endregion

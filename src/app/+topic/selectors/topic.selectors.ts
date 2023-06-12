//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';
import { Topic } from '../../../lib';

const topicFeatureSelector = createFeatureSelector<TopicInitialState>(topicFeatureKey);

export const getCurrentTopic = createSelector(topicFeatureSelector, state => {
  return state?.currentTopic;
});


//#endregion

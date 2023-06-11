//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';
import { Topic } from '../../../lib';

const topicFeatureSelector = createFeatureSelector<TopicInitialState>(topicFeatureKey);

export const getCurrentTopic = createSelector(topicFeatureSelector, state => {
  const topic = state?.currentTopic;
  return (!!topic ? Topic.from(topic) : void 0) as Topic;
});


//#endregion

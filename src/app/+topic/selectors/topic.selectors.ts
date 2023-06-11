//#region @browser
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { topicFeatureKey, TopicInitialState } from '../topic.models';

const topicFeatureSelector = createFeatureSelector<TopicInitialState>(topicFeatureKey);

export const allBatches = createSelector(topicFeatureSelector, state => {
  return state.topicArr;
});


export const filterAllBatchesBy = (customerId: string) => {
  return createSelector(topicFeatureSelector, state => {
    return state.topicArr;
  });
}


export const allowedToUndo = createSelector(topicFeatureSelector, state => {
  return state.topicArr.length > 0;
});

//#endregion
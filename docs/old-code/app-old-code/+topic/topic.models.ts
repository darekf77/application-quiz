//#region imports
import { ITopic } from '@darekf77/application-quiz/src';
//#endregion

//#region @browser
export const topicFeatureKey = 'topicsFeature';
export interface TopicInitialState {
  currentTopic: ITopic;
  showInputPopup: boolean;
  topicsToSubmit?: ITopic;
}
//#endregion

import { ITopic } from "application-quiz";

//#region @browser
export const topicFeatureKey = 'topicsFeature';

export interface TopicInitialState {
  currentTopic: ITopic;
  showInputPopup: boolean;
  topicsToSubmit?: ITopic;
};
//#endregion

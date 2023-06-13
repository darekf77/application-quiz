import { IAnswer, IQuestion } from "../../../lib";

//#region @browser
export const questionFeatureKey = 'questionsFeature';

export interface QuestionInitialState {
  currentQuestion: IQuestion;
  selectedAnswersIds: Number[];
  allAnswers: IAnswer[];
};
//#endregion

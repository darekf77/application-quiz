import { IAnswer, IQuestion } from 'application-quiz/src';

//#region @browser
export const questionFeatureKey = 'questionsFeature';

export interface QuestionInitialState {
  currentQuestion: IQuestion;
  selectedAnswersIds: Number[];
  allAnswers: IAnswer[];
}
//#endregion

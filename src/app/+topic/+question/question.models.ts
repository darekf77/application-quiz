//#region imports
import { IAnswer, IQuestion } from '@darekf77/application-quiz/src';
//#endregion
//#region @browser
export const questionFeatureKey = 'questionsFeature';
export interface QuestionInitialState {
  currentQuestion: IQuestion;
  selectedAnswersIds: Number[];
  allAnswers: IAnswer[];
}
//#endregion
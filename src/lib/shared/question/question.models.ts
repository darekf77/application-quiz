//#region imports
import type { Question } from './question';
//#endregion
export type IQuestion = Partial<Question>;
export const defaultModelValuesQuestion: Omit<IQuestion, 'ctrl' | 'clone'> = {
  description: '',
};
//#region imports
import type { Answer } from './answer';
//#endregion

export type IAnswer = Partial<Answer>;
export const defaultModelValuesAnswer: Omit<IAnswer, 'ctrl' | 'clone'> = {
  description: '',
};

import type { Question } from './question';

export type IQuestion = Partial<Question>;

export const defaultModelValuesQuestion: Omit<IQuestion, 'ctrl' | 'clone'> = {
  description: '',
};

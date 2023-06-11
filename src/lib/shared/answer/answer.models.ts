import type { Answer } from "./answer";

export type IAnswer = Partial<Answer>;

export const defaultModelValuesAnswer: Omit<IAnswer, 'ctrl' | 'clone'> = {
  description: '',
}

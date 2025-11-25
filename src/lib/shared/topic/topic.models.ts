//#region imports
import type { Topic } from './topic';
//#endregion

export type ITopic = Partial<Topic>;
export const defaultModelValuesTopic: Omit<ITopic, 'ctrl' | 'clone'> = {
  description: '',
};

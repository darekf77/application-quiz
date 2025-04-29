import type { Topic } from './topic';
export type ITopic = Partial<Topic>;
export const defaultModelValuesTopic: Omit<ITopic, 'ctrl' | 'clone'> = {
  description: '',
};

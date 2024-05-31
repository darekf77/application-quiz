import type { User } from './user';
import { FiredevEntityKeysToOmit } from 'firedev/src';

export type IUser = Partial<User>;

export const defaultModelValuesUser: Omit<
  IUser,
  FiredevEntityKeysToOmit | 'getScored' | 'getTotal' | ''
> = {
  description: '',
};

export interface Stats {
  topicName: string;
  scored: number;
  total: number;
}

export class TransformField {
  id: string;
}

export type IUSER = {
  [prop in keyof Required<typeof defaultModelValuesUser>]: TransformField;
};

export class USER implements IUSER {
  id: TransformField;
  username: TransformField;
  statistics: TransformField;
  description: TransformField;
}

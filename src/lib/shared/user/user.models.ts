//#region imports
import { TaonEntityKeysToOmit } from 'taon/src';

import type { User } from './user';
//#endregion
export type IUser = Partial<User>;
export const defaultModelValuesUser: Omit<
  IUser,
  | TaonEntityKeysToOmit
  | 'getScored'
  | 'getTotal'
  | 'inject'
  | 'injectRepo'
  | 'injectCustomRepository'
  | 'injectCustomRepo'
  | 'injectController'
  | 'injectCtrl'
  | 'injectGlobalProvider'
  | 'injectLocalProvider'
  | 'injectContextProvider'
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
import type { User } from "./user";

export type IUser = Partial<User>;

export const defaultModelValuesUser: Omit<IUser, 'ctrl' | 'clone'> = {
  description: '',
}
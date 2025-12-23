//#region imports
import { PrimaryGeneratedColumn, Taon } from 'taon/src';
import {
  TaonBaseEntity,
  TaonEntity,
  Generated,
  Column,
  SimpleJsonColumn,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import type { UserController } from './user.controller';
import {
  Stats,
  defaultModelValuesUser as defaultModelValues,
} from './user.models';
//#endregion

@TaonEntity({
  className: 'User',
  defaultModelValues,
  defaultModelMapping: {
    statistics: 'Stats',
  },
})
export class User extends TaonBaseEntity {
  //#region static
  static from(obj: Omit<Partial<User>, 'ctrl'>) {
    return _.merge(new User(), obj) as User;
  }

  static empty() {
    return User.from(defaultModelValues);
  }

  //#endregion

  //#region fields & getters

  //#region @websql
  @PrimaryGeneratedColumn()
  //#endregion
  id: string;

  //#region @websql
  @Column({
    type: 'varchar',
    length: '100',
    unique: true,
    nullable: true,
  })
  //#endregion
  username: string;

  //#region @websql
  @SimpleJsonColumn()
  //#endregion
  statistics?: Stats[];

  //#endregion

  //#region @websql
  @Column({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  description?: string;

  //#endregion

  //#region methods
  getScored() {
    return (this.statistics || []).reduce((a, b) => {
      return a + b.scored;
    }, 0);
  }

  getTotal() {
    return (this.statistics || []).reduce((a, b) => {
      return a + b.total;
    }, 0);
  }
}

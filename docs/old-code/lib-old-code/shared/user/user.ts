//#region imports
import { Taon, TaonBaseAbstractEntity } from 'taon/src';
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

@TaonEntity<User>({
  className: 'User',
  defaultModelValues: () => ({ ...defaultModelValues }),
})
export class User extends TaonBaseAbstractEntity<User> {
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

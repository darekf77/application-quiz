import { Firedev } from 'firedev/src';
import { _ } from 'tnp-core/src';
import type { UserController } from './user.controller';
import {
  Stats,
  defaultModelValuesUser as defaultModelValues,
} from './user.models';

@Firedev.Entity({
  className: 'User',
  defaultModelValues,
  defaultModelMapping: {
    statistics: 'Stats',
  },
})
export class User extends Firedev.Base.Entity {
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
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: '100',
    unique: true,
    nullable: true,
  })
  //#endregion
  username: string;

  //#region @websql
  @Firedev.Orm.Column.SimpleJson()
  //#endregion
  statistics?: Stats[];
  //#endregion

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  description?: string;
  //#endregion

  //#region methods
  clone(options?: { propsToOmit: keyof User[] }): User {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new User(), _.omit(this, propsToOmit));
  }

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

  //#endregion
}

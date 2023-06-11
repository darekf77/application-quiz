import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { UserController } from './user.controller';
import { defaultModelValuesUser as defaultModelValues  } from './user.models';
@Firedev.Entity({
  className: 'User',
  defaultModelValues
})
export class User extends Firedev.Base.Entity<any> {

  //#region static
  static ctrl: UserController;
  static from(obj: Omit<Partial<User>, 'ctrl'>) {
    return _.merge(new User(), obj) as User;
  }
  static getAll() {
    return this.ctrl.getAll();
  }
  static empty() {
    return User.from(defaultModelValues);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: UserController;

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description
  })
  //#endregion
  description?: string;
  //#endregion

  //#region methods
  clone(options?: { propsToOmit: keyof User[]; }): User {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new User(), _.omit(this, propsToOmit));
  }
  //#endregion

}

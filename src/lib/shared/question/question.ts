import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { QuestionController } from './question.controller';
import { defaultModelValuesQuestion as defaultModelValues } from './question.models';
@Firedev.Entity({
  className: 'Question',
  defaultModelValues,
})
export class Question extends Firedev.Base.Entity<any> {

  //#region static
  static ctrl: QuestionController;
  static from(obj: Omit<Partial<Question>, 'ctrl'>) {
    return _.merge(new Question(), obj) as Question;
  }
  static getAll() {
    return this.ctrl.getAll();
  }
  static empty() {
    return Question.from(defaultModelValues);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: QuestionController;

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
  clone(options?: { propsToOmit: keyof Question[]; }): Question {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Question(), _.omit(this, propsToOmit));
  }
  //#endregion

}

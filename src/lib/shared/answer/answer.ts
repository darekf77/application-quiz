import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { AnswerController } from './answer.controller';
import { defaultModelValuesAnswer as defaultModelValues } from './answer.models';
import { RawAnswer } from '../../models';
@Firedev.Entity({
  className: 'Answer',
  defaultModelValues,
})
export class Answer extends Firedev.Base.Entity<any> implements RawAnswer {

  //#region static
  static ctrl: AnswerController;
  static from(obj: Omit<Partial<Answer>, 'ctrl'>) {
    return _.merge(new Answer(), obj) as Answer;
  }
  static getAll() {
    return this.ctrl.getAll();
  }
  static empty() {
    return Answer.from(defaultModelValues);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: AnswerController;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.description
  })
  //#endregion
  title: string;

  isCorrect?: boolean;


  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'int',
  })
  //#endregion
  questionId?: number;
  //#endregion

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
  clone(options?: { propsToOmit: keyof Answer[]; }): Answer {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Answer(), _.omit(this, propsToOmit));
  }
  //#endregion

}

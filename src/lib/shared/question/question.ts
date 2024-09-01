import { Taon } from 'firedev/src';
import { _ } from 'tnp-core/src';
import type { QuestionController } from './question.controller';
import { defaultModelValuesQuestion as defaultModelValues } from './question.models';
import { RawAnswer, RawQuestion } from '../../models';
import { Answer } from '../answer';
@Taon.Entity({
  className: 'Question',
  defaultModelValues,
})
export class Question extends Taon.Base.Entity<any> implements RawQuestion {
  //#region static

  static from(obj: Omit<Partial<Question>, 'ctrl'>) {
    const res = _.merge(new Question(), obj) as Question;
    res.answers = (res.answers || []).map(a => Answer.from(a));
    return res;
  }

  static empty() {
    return Question.from(defaultModelValues);
  }
  //#endregion

  //#region fields & getters

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  title: string;
  answers: RawAnswer[];

  //#region @websql
  @Taon.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
  })
  //#endregion
  topicId?: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
    nullable: true,
  })
  //#endregion
  nextOid?: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
    nullable: true,
  })
  //#endregion
  prevOid?: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
  })
  //#endregion
  oid?: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  description?: string;

  //#endregion

  //#region methods
  clone(options?: { propsToOmit: keyof Question[] }): Question {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Question(), _.omit(this, propsToOmit));
  }
  //#endregion
}

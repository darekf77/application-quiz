import { Firedev } from 'firedev/src';
import { _ } from 'tnp-core/src';
import type { AnswerController } from './answer.controller';
import { defaultModelValuesAnswer as defaultModelValues } from './answer.models';
import { RawAnswer } from '../../models';
import type { Topic } from '../topic';

@Firedev.Entity({
  className: 'Answer',
  defaultModelValues,
})
export class Answer extends Firedev.Base.Entity<any> implements RawAnswer {
  //#region static

  static from(obj: Omit<Partial<Answer>, 'ctrl'>) {
    return _.merge(new Answer(), obj) as Answer;
  }

  static empty() {
    return Answer.from(defaultModelValues);
  }
  //#endregion

  //#region fields & getters

  topic: Topic;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  title: string;

  //#region @websql
  @Firedev.Orm.Column.Boolean(false)
  //#endregion
  isCorrect?: boolean;

  userAnswer?: boolean;
  answeredCorrectly?: boolean;

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
    type: 'int',
  })
  //#endregion
  Oid?: number;
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
  clone(options?: { propsToOmit: (keyof Answer)[] }): Answer {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Answer(), _.omit(this, propsToOmit));
  }
  //#endregion
}

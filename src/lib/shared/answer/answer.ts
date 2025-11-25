//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawAnswer } from '../../models';
import type { Topic } from '../topic';

import type { AnswerController } from './answer.controller';
import { defaultModelValuesAnswer as defaultModelValues } from './answer.models';
//#endregion

@Taon.Entity({
  className: 'Answer',
  defaultModelValues,
})
export class Answer extends Taon.Base.Entity<any> implements RawAnswer {
  //#region static
  static from(obj: Omit<Partial<Answer>, 'ctrl'>) {
    return _.merge(new Answer(), obj) as Answer;
  }

  static empty() {
    return Answer.from(defaultModelValues);
  }

  //#endregion

  //#region fields & getters
  declare topic: Topic;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  declare title: string;

  //#region @websql
  @Taon.Orm.Column.Boolean(false)
  //#endregion
  declare isCorrect?: boolean;

  declare userAnswer?: boolean;

  declare answeredCorrectly?: boolean;

  //#region @websql
  @Taon.Orm.Column.Generated()
  //#endregion
  declare id: number;

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
  })
  //#endregion
  declare questionId?: number;

  //#endregion

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'int',
  })
  //#endregion
  declare Oid?: number;

  //#endregion

  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  declare description?: string;
}

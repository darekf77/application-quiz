//#region imports
import { Taon, TaonBaseAbstractEntity } from 'taon/src';
import {
  TaonBaseEntity,
  TaonEntity,
  Generated,
  Column,
  BooleanColumn,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawAnswer } from '../../models';
import type { Topic } from '../topic';

import type { AnswerController } from './answer.controller';
import { defaultModelValuesAnswer as defaultModelValues } from './answer.models';

//#endregion

@TaonEntity({
  className: 'Answer',
  defaultModelValues: () => ({ ...defaultModelValues }),
})
export class Answer extends TaonBaseAbstractEntity<Answer> implements RawAnswer {
  //#region fields & getters
  declare topic: Topic;

  //#region @websql
  @Column({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  declare title: string;

  //#region @websql
  @BooleanColumn(false)
  //#endregion
  declare isCorrect?: boolean;

  declare userAnswer?: boolean;

  declare answeredCorrectly?: boolean;

  //#region @websql
  @Column({
    type: 'int',
  })
  //#endregion
  declare questionId?: number;

  //#endregion

  //#region @websql
  @Column({
    type: 'int',
  })
  //#endregion
  declare Oid?: number;

  //#endregion

  //#region @websql
  @Column({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  declare description?: string;
}

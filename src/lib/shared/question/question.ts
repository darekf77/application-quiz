//#region imports
import { Taon, TaonBaseAbstractEntity } from 'taon/src';
import { TaonBaseEntity, TaonEntity, Generated, Column } from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawAnswer, RawQuestion } from '../../models';
import { Answer } from '../answer';

import { defaultModelValuesQuestion as defaultModelValues } from './question.models';

//#endregion

@TaonEntity({
  className: 'Question',
  defaultModelValues: () => ({ ...defaultModelValues }),
})
export class Question
  extends TaonBaseAbstractEntity<any>
  implements RawQuestion
{
  //#region fields & getters

  //#region @websql
  @Column({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  declare title: string;

  declare answers: RawAnswer[];

  //#region @websql
  @Column({
    type: 'int',
  })
  //#endregion
  declare topicId?: number;

  //#region @websql
  @Column({
    type: 'int',
    nullable: true,
  })
  //#endregion
  declare nextOid?: number;

  //#region @websql
  @Column({
    type: 'int',
    nullable: true,
  })
  //#endregion
  declare prevOid?: number;

  //#region @websql
  @Column({
    type: 'int',
  })
  //#endregion
  declare oid?: number;

  //#region @websql
  @Column({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  declare description?: string;
  //#endregion
}

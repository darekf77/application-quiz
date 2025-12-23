//#region imports
import { PrimaryGeneratedColumn, Taon } from 'taon/src';
import { TaonBaseEntity, TaonEntity, Generated, Column } from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawAnswer, RawQuestion } from '../../models';
import { Answer } from '../answer';

import { defaultModelValuesQuestion as defaultModelValues } from './question.models';

//#endregion

@TaonEntity({
  className: 'Question',
  defaultModelValues,
})
export class Question extends TaonBaseEntity<any> implements RawQuestion {
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
  @PrimaryGeneratedColumn()
  //#endregion
  declare id: number;

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

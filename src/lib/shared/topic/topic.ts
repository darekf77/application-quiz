//#region imports
import { ClassHelpers, PrimaryGeneratedColumn, Taon } from 'taon/src';
import {
  TaonBaseEntity,
  TaonEntity,
  Generated,
  Column,
  SimpleJsonColumn,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawQuestion, RawTopic } from '../../models';

import type { TopicController } from './topic.controller';
import { defaultModelValuesTopic as defaultModelValues } from './topic.models';

//#endregion

@TaonEntity({
  className: 'Topic',
  defaultModelValues,
})
export class Topic extends TaonBaseEntity<any> implements RawTopic {
  //#region static
  static from(obj: Omit<Partial<Topic>, 'ctrl'>) {
    return _.merge(new Topic(), obj) as Topic;
  }

  static empty() {
    return Topic.from(defaultModelValues);
  }

  //#endregion

  //#region fields & getters

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
  @Column({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.topicTitleKebabCase,
    nullable: true,
  })
  //#endregion
  declare topicTitleKebabCase: string;

  declare question: RawQuestion[];

  //#region @websql
  @PrimaryGeneratedColumn()
  //#endregion
  declare id: number;

  //#region @websql
  @SimpleJsonColumn()
  //#endregion
  declare questionsOids: number[];

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

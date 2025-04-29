import { ClassHelpers, Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { RawQuestion, RawTopic } from '../../models';

import type { TopicController } from './topic.controller';
import { defaultModelValuesTopic as defaultModelValues } from './topic.models';
@Taon.Entity({
  className: 'Topic',
  defaultModelValues,
})
export class Topic extends Taon.Base.Entity<any> implements RawTopic {
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
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  declare title: string;
  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.topicTitleKebabCase,
    nullable: true,
  })
  //#endregion
  declare topicTitleKebabCase: string;
  declare question: RawQuestion[];
  //#region @websql
  @Taon.Orm.Column.Generated()
  //#endregion
  declare id: number;
  //#region @websql
  @Taon.Orm.Column.SimpleJson()
  //#endregion
  declare questionsOids: number[];
  //#region @websql
  @Taon.Orm.Column.Custom({
    type: 'varchar',
    length: 100,
    default: defaultModelValues.description,
    nullable: true,
  })
  //#endregion
  declare description?: string;
  //#endregion
  //#region methods
  clone(options?: { propsToOmit: keyof Topic[] }): Topic {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Topic(), _.omit(this, propsToOmit));
  }
}

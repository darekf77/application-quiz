import { ClassHelpers, Firedev } from 'firedev/src';
import { _ } from 'tnp-core/src';
import type { TopicController } from './topic.controller';
import { defaultModelValuesTopic as defaultModelValues } from './topic.models';
import { RawQuestion, RawTopic } from '../../models';

@Firedev.Entity({
  className: 'Topic',
  defaultModelValues,
})
export class Topic extends Firedev.Base.Entity<any> implements RawTopic {
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
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title,
    nullable: true,
  })
  //#endregion
  title: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.topicTitleKebabCase,
    nullable: true,
  })
  //#endregion
  topicTitleKebabCase: string;

  question: RawQuestion[];

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

  //#region @websql
  @Firedev.Orm.Column.SimpleJson()
  //#endregion
  questionsOids: number[];

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
  clone(options?: { propsToOmit: keyof Topic[] }): Topic {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Topic(), _.omit(this, propsToOmit));
  }
  //#endregion
}

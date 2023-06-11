import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import type { TopicController } from './topic.controller';
import { defaultModelValuesTopic as defaultModelValues } from './topic.models';
import { RawQuestion, RawTopic } from '../../models';
@Firedev.Entity({
  className: 'Topic',
  defaultModelValues,
})
export class Topic extends Firedev.Base.Entity<any> implements RawTopic {

  //#region static
  static ctrl: TopicController;
  static from(obj: Omit<Partial<Topic>, 'ctrl'>) {
    return _.merge(new Topic(), obj) as Topic;
  }
  static getAll() {
    return this.ctrl.getAll();
  }
  static empty() {
    return Topic.from(defaultModelValues);
  }
  //#endregion

  //#region constructor
  private constructor(...args) { // @ts-ignore
    super(...args);
  }
  //#endregion

  //#region fields & getters
  ctrl: TopicController;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'varchar',
    length: 200,
    default: defaultModelValues.title
  })
  //#endregion
  title: string;

  //#region @websql
  @Firedev.Orm.Column.Custom({
    type: 'int',
    nullable: true,
  })
  //#endregion
  firstQuestionId: number;

  question: RawQuestion[];

  //#region @websql
  @Firedev.Orm.Column.Generated()
  //#endregion
  id: number;

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
  clone(options?: { propsToOmit: keyof Topic[]; }): Topic {
    const { propsToOmit } = options || { propsToOmit: ['id', 'ctrl'] };
    return _.merge(new Topic(), _.omit(this, propsToOmit));
  }
  //#endregion

}

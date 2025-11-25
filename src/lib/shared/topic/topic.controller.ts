//#region imports
import { ClassHelpers, Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { Answer } from '../answer';
import { Question } from '../question';

import { Topic } from './topic';
//#endregion

@Taon.Controller({
  className: 'TopicController',
})
export class TopicController extends Taon.Base.CrudController<any> {
  entityClassResolveFn = () => Topic;

  @Taon.Http.GET()
  hello(): Taon.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @Taon.Http.GET()
  getAll(
    @Taon.Http.Param.Query('limit')
    limit = Infinity,
  ): Taon.Response<Topic[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      //
      let arr = (await Taon.getResponseValue(config, {
        req,
        res,
      })) as Topic[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }

  @Taon.Http.GET(`/by/title/:topicTitleKebabCase`)
  getByTitleKebabCase(
    @Taon.Http.Param.Path('topicTitleKebabCase')
    topicTitleKebabCase: string,
  ): Taon.Response<Topic> {
    //#region @websqlFunc
    return async (req, res) => {
      //
      const topic = await this.db.findOne({
        where: {
          topicTitleKebabCase,
        },
      });
      return topic;
    };
    //#endregion
  }
}

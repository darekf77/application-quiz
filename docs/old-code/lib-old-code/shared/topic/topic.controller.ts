//#region imports
import { ClassHelpers, Taon } from 'taon/src';
import {
  GET,
  Query,
  Path,
  TaonBaseCrudController,
  TaonController,
} from 'taon/src';
import { _ } from 'tnp-core/src';

import { Answer } from '../answer';
import { Question } from '../question';

import { Topic } from './topic';

//#endregion

@TaonController({
  className: 'TopicController',
})
export class TopicController extends TaonBaseCrudController<any> {
  entityClassResolveFn = () => Topic;

  @GET()
  hello(): Taon.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @GET()
  getAll(
    @Query('limit')
    limit = Infinity,
  ): Taon.Response<Topic[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      //
      let arr = (await Taon.getResponseValue(config, {
        req,
        res,
      } as any)) as Topic[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }

  @GET(`/by/title/:topicTitleKebabCase`)
  getByTitleKebabCase(
    @Path('topicTitleKebabCase')
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

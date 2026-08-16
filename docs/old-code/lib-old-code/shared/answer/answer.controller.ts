//#region imports
import { Taon } from 'taon/src';
import { GET, Query, TaonBaseCrudController, TaonController } from 'taon/src';

import { Answer } from './answer';

//#endregion

@TaonController({
  className: 'AnswerController',
})
export class AnswerController extends TaonBaseCrudController<any> {
  entityClassResolveFn = () => Answer;

  @GET()
  hello(): Taon.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @GET() //
  getAll(
    @Query('limit')
    limit = Infinity,
  ): Taon.Response<Answer[]> {
    //#region @websqlFunc
    const config = this.db;
    return async (req, res) => {
      const config = await super.getAll();
      let arr = (await Taon.getResponseValue(config, {
        req,
        res,
      } as any)) as Answer[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }
}

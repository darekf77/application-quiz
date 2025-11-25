//#region imports
import { Taon } from 'taon/src';

import { Answer } from './answer';
//#endregion

@Taon.Controller({
  className: 'AnswerController',
})
export class AnswerController extends Taon.Base.CrudController<any> {
  entityClassResolveFn = () => Answer;

  @Taon.Http.GET()
  hello(): Taon.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @Taon.Http.GET() //
  getAll(
    @Taon.Http.Param.Query('limit')
    limit = Infinity,
  ): Taon.Response<Answer[]> {
    //#region @websqlFunc
    const config = this.db;
    return async (req, res) => {
      const config = await super.getAll();
      let arr = (await Taon.getResponseValue(config, {
        req,
        res,
      })) as Answer[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }
}

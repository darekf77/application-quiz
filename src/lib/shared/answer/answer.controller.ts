import { Taon } from 'firedev/src';
import { Answer } from './answer';

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

  @Taon.Http.GET() // @ts-ignore
  getAll(
    @Taon.Http.Param.Query('limit') limit = Infinity,
  ): Taon.Response<Answer[]> {
    //#region @websqlFunc
    const config = this.db;
    return async (req, res) => {
      // @ts-ignore
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

  //#region @websql
  async initExampleDbData() {
    // const repo = this.connection.getRepository(Answer);
    // await repo.save(new Answer())
    // const all = await repo.find()
  }
  //#endregion
}

import { Firedev } from 'firedev/src';
import { Answer } from './answer';

@Firedev.Controller({
  className: 'AnswerController',
})
export class AnswerController extends Firedev.Base.CrudController<any> {
  entityClassResolveFn = () => Answer;

  @Firedev.Http.GET()
  hello(): Firedev.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @Firedev.Http.GET() // @ts-ignore
  getAll(
    @Firedev.Http.Param.Query('limit') limit = Infinity,
  ): Firedev.Response<Answer[]> {
    //#region @websqlFunc
    const config = this.db;
    return async (req, res) => {
      // @ts-ignore
      let arr = (await Firedev.getResponseValue(config, {
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

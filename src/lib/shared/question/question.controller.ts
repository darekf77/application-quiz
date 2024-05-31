import { Firedev } from 'firedev/src';
import { Question } from './question';
import { Answer } from '../answer';
import { Topic } from '../topic';

@Firedev.Controller({
  className: 'QuestionController',
})
export class QuestionController extends Firedev.Base.CrudController<any> {
  entity() {
    return Question;
  }
  @Firedev.Http.GET()
  hello(): Firedev.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @Firedev.Http.GET(`/${Firedev.symbols.CRUD_TABLE_MODELS}`) // @ts-ignore
  getAll(
    @Firedev.Http.Param.Query('limit') limit = Infinity,
  ): Firedev.Response<Question[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      // @ts-ignore
      let arr = (await Firedev.getResponseValue(
        config,
        req,
        res,
      )) as Question[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }

  @Firedev.Http.GET(`/question/:questionOid/topic/:topicTitleKebabCase`) // @ts-ignore
  getQuestionWithAswers(
    @Firedev.Http.Param.Path('questionOid') questionOid: number,
    @Firedev.Http.Param.Path('topicTitleKebabCase') topicTitleKebabCase: string,
  ): Firedev.Response<Question> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      // @ts-ignore
      const topic = await this.connection.getRepository(Topic).findOne({
        where: {
          topicTitleKebabCase,
        },
      });
      let question = await this.connection.getRepository(Question).findOne({
        where: {
          oid: questionOid,
          topicId: topic.id,
        },
      });
      const answers = await this.connection.getRepository(Answer).find({
        where: {
          questionId: question.id,
        },
      });
      question.answers = answers.map(a => {
        delete a.isCorrect;
        return a;
      });
      return question;
    };
    //#endregion
  }

  //#region @websql
  async initExampleDbData() {
    // const repo = this.connection.getRepository(Question);
    // await repo.save(new Question())
    // const all = await repo.find()
  }
  //#endregion
}

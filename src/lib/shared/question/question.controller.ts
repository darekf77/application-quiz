import { Taon } from 'firedev/src';
import { Question } from './question';
import { Answer } from '../answer';
import { Topic } from '../topic';

@Taon.Controller({
  className: 'QuestionController',
})
export class QuestionController extends Taon.Base.CrudController<any> {
  entityClassResolveFn = () => Question;

  get questionRepository() {
    return this.db;
  }

  topicRepository = this.injectRepo(Topic);
  anwserRepository = this.injectRepo(Answer);

  @Taon.Http.GET()
  hello(): Taon.Response<string> {
    return async () => {
      return 'Hello world';
    };
  }

  @Taon.Http.GET()
  getAll(
    @Taon.Http.Param.Query('limit') limit = Infinity,
  ): Taon.Response<Question[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      // @ts-ignore
      let arr = (await Taon.getResponseValue(config, {
        req,
        res,
      })) as Question[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    };
    //#endregion
  }

  @Taon.Http.GET(`/question/:questionOid/topic/:topicTitleKebabCase`) // @ts-ignore
  getQuestionWithAswers(
    @Taon.Http.Param.Path('questionOid') questionOid: number,
    @Taon.Http.Param.Path('topicTitleKebabCase') topicTitleKebabCase: string,
  ): Taon.Response<Question> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      // @ts-ignore
      const topic = await this.topicRepository.findOne({
        where: {
          topicTitleKebabCase,
        },
      });
      let question = await this.questionRepository.findOne({
        where: {
          oid: questionOid,
          topicId: topic.id,
        },
      });
      const answers = await this.anwserRepository.find({
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

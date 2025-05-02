//#region imports
import { Taon } from 'taon/src';

import { Answer } from '../answer';
import { Topic } from '../topic';

import { Question } from './question';
//#endregion
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
    @Taon.Http.Param.Query('limit')
    limit = Infinity,
  ): Taon.Response<Question[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      //
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
  @Taon.Http.GET(`/question/:questionOid/topic/:topicTitleKebabCase`) //
  getQuestionWithAswers(
    @Taon.Http.Param.Path('questionOid')
    questionOid: number,
    @Taon.Http.Param.Path('topicTitleKebabCase')
    topicTitleKebabCase: string,
  ): Taon.Response<Question> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => {
      //
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
  
}
import { Firedev } from 'firedev';
import { Question } from './question';
import { Answer } from '../answer';
import { Topic } from '../topic';

@Firedev.Controller({
  className: 'QuestionController',
  entity: Question
})
export class QuestionController extends Firedev.Base.Controller<any> {

  @Firedev.Http.GET()
  hello(): Firedev.Response<string> {
    return async () => {
      return 'Hello world';
    }
  }

  @Firedev.Http.GET(`/${Firedev.symbols.CRUD_TABLE_MODELS}`) // @ts-ignore
  getAll(@Firedev.Http.Param.Query('limit') limit = Infinity): Firedev.Response<Question[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => { // @ts-ignore
      let arr = await Firedev.getResponseValue(config, req, res) as Question[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    }
    //#endregion
  }

  @Firedev.Http.GET(`/get/questino/with/answers/for/:topicId`) // @ts-ignore
  getQuestionWithAswers(@Firedev.Http.Param.Query('questionId') questionId: number,): Firedev.Response<Question> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => { // @ts-ignore
      let question = await this.connection.getRepository(Question).findOne({
        where: {
          id: questionId
        }
      });
      const answers = await this.connection.getRepository(Answer).find({
        where: {
          questionId,
        }
      });
      question.answers = answers;
      return question;
    }
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

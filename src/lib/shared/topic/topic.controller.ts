import { ClassHelpers, Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

//#region @websql
import { backendQuizData } from '../../application-quiz.data';
//#endregion
import { Answer } from '../answer';
import { Question } from '../question';

import { Topic } from './topic';
@Taon.Controller({
  className: 'TopicController',
})
export class TopicController extends Taon.Base.CrudController<any> {
  entityClassResolveFn = () => Topic;
  questionRepository = this.injectRepo(Question);
  topicRepository = this.injectRepo(Topic);
  answerRepository = this.injectRepo(Answer);
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
  //#region @websql
  async initExampleDbData() {
    const topics = [];
    for (let index = 0; index < backendQuizData.topics.length; index++) {
      let topic = Topic.from(backendQuizData.topics[index]);
      topic.topicTitleKebabCase = _.kebabCase(topic.title);
      const questions = _.cloneDeep(topic.question);
      topic.questionsOids = _.times(questions.length, n => n + 1);
      topic = await this.topicRepository.save(topic);
      topics[index] = topic;
      for (let index2 = 0; index2 < questions.length; index2++) {
        let question = Question.from(questions[index2]);
        question.topicId = topic.id;
        question.oid = index2 + 1;
        const anwsers = _.cloneDeep(question.answers);
        if (index2 === 0) {
          question.prevOid = null;
        } else {
          question.prevOid = question.oid - 1;
        }
        if (index2 === questions.length - 1) {
          question.nextOid = null;
        } else {
          question.nextOid = question.oid + 1;
        }
        question = await this.questionRepository.save(question);
        topic.question = Array.isArray(topic.question) ? topic.question : [];
        topic.question[index2] = question;
        for (let index3 = 0; index3 < anwsers.length; index3++) {
          let answer = Answer.from(anwsers[index3]);
          answer.questionId = question.id;
          answer.Oid = index3 + 1;
          answer = await this.answerRepository.save(answer);
          question.answers = Array.isArray(question.answers)
            ? question.answers
            : [];
          question.answers[index3] = answer;
        }
      }
    }
    // console.log({
    //   'WHOLE DB': topics,
    // });
  }
  //#endregion
}

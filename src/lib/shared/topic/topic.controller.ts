import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
import { Topic } from './topic';
//#region @websql
import { backendQuizData } from '../../application-quiz.data';
//#endregion
import { Question } from '../question';
import { Answer } from '../answer';

@Firedev.Controller({
  className: 'TopicController',
  entity: Topic
})
export class TopicController extends Firedev.Base.Controller<any> {

  @Firedev.Http.GET()
  hello(): Firedev.Response<string> {
    return async () => {
      return 'Hello world';
    }
  }

  @Firedev.Http.GET(`/${Firedev.symbols.CRUD_TABLE_MODELS}`) // @ts-ignore
  getAll(@Firedev.Http.Param.Query('limit') limit = Infinity): Firedev.Response<Topic[]> {
    //#region @websqlFunc
    const config = super.getAll();
    return async (req, res) => { // @ts-ignore
      let arr = await Firedev.getResponseValue(config, req, res) as Topic[];
      if (arr.length > limit) {
        arr = arr.slice(0, limit - 1);
      }
      return arr as any;
    }
    //#endregion
  }

  //#region @websql
  async initExampleDbData() {
    const repo = {
      topic: this.connection.getRepository(Topic),
      question: this.connection.getRepository(Question),
      anwser: this.connection.getRepository(Answer),
    }

    const topics = [];
    for (let index = 0; index < backendQuizData.topics.length; index++) {
      let topic = Topic.from(backendQuizData.topics[index]);
      const questions = _.cloneDeep(topic.question);
      topic = await repo.topic.save(topic);
      topics[index] = topic;
      for (let index2 = 0; index2 < questions.length; index2++) {
        let question = Question.from(questions[index2]);
        question.topicId = topic.id;
        const anwsers = _.cloneDeep(question.answers);
        question = await repo.question.save(question);
        topic.question[index2] = question;
        for (let index3 = 0; index3 < anwsers.length; index3++) {
          let answer = Answer.from(anwsers[index3]);
          answer.questionId = question.id;
          answer = await repo.anwser.save(answer);
          question.answers[index3] = answer;
        }
      }
    }

    console.log({
      topics
    })

  }

  //#endregion

}

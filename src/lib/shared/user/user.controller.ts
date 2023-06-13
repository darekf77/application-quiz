import { Firedev } from 'firedev';
import { User } from './user';
import { Answer } from '../answer/answer';
import { Stats } from './user.models';
import { Topic } from '../topic';
import { Question } from '../question';

@Firedev.Controller({
  className: 'UserController',
  entity: User
})
export class UserController extends Firedev.Base.Controller<User> {

  /**
   *
   * @param answers
   * @param username should be encoded encodeURIComponent
   * @returns
   */
  @Firedev.Http.POST('/user/:username') // @ts-ignore
  submit(
    @Firedev.Http.Param.Body('answers') answers: Answer[],
    @Firedev.Http.Param.Path('username') username: string,
  ): Firedev.Response<User> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      username = decodeURIComponent(username)
      console.log({
        answers,
        username,
      })

      const userExists = (await this.repository.count({
        where: {
          username,
        }
      })) > 0;

      if (userExists) {
        throw new Error(`Username exists or not correct`);
      }

      let user = await this.repository.save(User.from({
        username,
      }));

      const repo = {
        answer: this.connection.getRepository(Answer),
        topic: this.connection.getRepository(Topic),
        question: this.connection.getRepository(Question),
      };
      const allTopics = await repo.topic.find();
      const allQuestions = await repo.question.find();
      const allAnswers = await repo.answer.find();

      for (let index = 0; index < allAnswers.length; index++) {
        const answer = allAnswers[index];
        answer.topic = allTopics.find(topic => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          return topic.id === question.id;
        });
      }

      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        answer.topic = allTopics.find(topic => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          return topic.id === question.id;
        });
        answer.answeredCorrectly = (answer.userAnswer === allAnswers.find(a => a.id == answer.id).isCorrect);
      }
      user.statistics = [] as any;

      for (let index = 0; index < allTopics.length; index++) {
        const topic = allTopics[index];
        user.statistics.push({
          topicName: topic.title,
          scored: answers.filter(a => (a.topic.id === topic.id) && a.answeredCorrectly).length,
          total: allAnswers.filter(a => (a.topic.id === topic.id) && a.answeredCorrectly).length,
        });
      }

      user = await this.repository.save(user);
      return user;
    }
    //#endregion
  }

  @Firedev.Http.POST('/stats/for/user/:username') // @ts-ignore
  getByUsername(@Firedev.Http.Param.Path('username') username: string,): Firedev.Response<User> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      const user = await this.repository.findOne({
        where: {
          username: decodeURIComponent(username)
        }
      });

      return user;
    }
    //#endregion
  }


  //#region @websql
  async initExampleDbData() {
    // const repo = this.connection.getRepository(User);
    // await repo.save(new User())
    // const all = await repo.find()
  }
  //#endregion

}

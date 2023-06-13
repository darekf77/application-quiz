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
   * @param corectAnswersIds
   * @param username should be encoded encodeURIComponent
   * @returns
   */
  @Firedev.Http.POST('/submit/user/:username') // @ts-ignore
  submit(
    @Firedev.Http.Param.Body('answers') corectAnswersIds: Number[],
    @Firedev.Http.Param.Path('username') username: string,
    @Firedev.Http.Param.Query('onlyTopicId') onlyTopicIds: Number[],
  ): Firedev.Response<User> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      username = decodeURIComponent(username)
      console.log({
        answers: corectAnswersIds,
        username,
        onlyTopicId: onlyTopicIds,
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

      let answers = corectAnswersIds.map(id => {
        const answer = allAnswers.find(a => a.id == id);
        answer.userAnswer = true;
        answer.topic = allTopics.find(topic => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          return topic.id === question.id;
        });
        return answer;
      });

      if (onlyTopicIds) {
        answers = answers.filter(f => onlyTopicIds.includes(f.topic.id));
      }

      for (let index = 0; index < answers.length; index++) {
        const answer = answers[index];
        answer.topic = allTopics.find(topic => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          return topic.id === question.id;
        });
        answer.answeredCorrectly = (answer.userAnswer === allAnswers.find(a => a.id == answer.id).isCorrect);
      }
      if (!Array.isArray(user.statistics)) {
        user.statistics = [];
      }

      for (let index = 0; index < allTopics.length; index++) {
        const topic = allTopics[index];
        const existedTopicIndex = (user.statistics || []).findIndex(f => f.topicName === topic.title);
        const data = {
          topicName: topic.title,
          scored: answers.filter(a => (a.topic.id === topic.id) && a.answeredCorrectly).length,
          total: allAnswers.filter(a => (a.topic.id === topic.id) && a.answeredCorrectly).length,
        };
        if (existedTopicIndex !== -1) {
          user.statistics[existedTopicIndex] = data;
        } else {
          user.statistics.push(data);
        }
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

import { Firedev } from 'firedev';
import { User } from './user';
import { Answer } from '../answer/answer';
import { Stats } from './user.models';
import { Topic } from '../topic';
import { Question } from '../question';
import { _ } from 'tnp-core';

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
    @Firedev.Http.Param.Query('onlyTopicId') onlyTopicId: Number,
  ): Firedev.Response<User> {
    //#region @websqlFunc
    return async (req, res) => { // @ts-ignore
      username = decodeURIComponent(username)

      const userExists = (await this.repository.count({
        where: {
          usernamemaster: username,
        }
      })) > 0;

      if (userExists) {
        throw new Error(`Username exists or not correct`);
      }

      let user = await this.repository.save(User.from({
        usernamemaster: username,
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
          return topic.id === question.topicId;
        });
      }

      let userAnswers = corectAnswersIds.map(id => {
        const answerFromDB = allAnswers.find(a => a.id == id);
        const answer = answerFromDB.clone({ propsToOmit: ['ctrl'] });
        answer.userAnswer = true;
        answer.topic = Topic.from(answer.topic);
        return answer;
      });

      const updateOnlyForTopicId = _.isNumber(onlyTopicId) && !_.isNaN(onlyTopicId);

      if (updateOnlyForTopicId) {
        userAnswers = userAnswers.filter(f => onlyTopicId === f.topic.id);
      }

      for (let index = 0; index < userAnswers.length; index++) {
        const userAnswer = userAnswers[index];
        userAnswer.answeredCorrectly = (
          userAnswer.userAnswer === allAnswers.find(a => a.id == userAnswer.id).isCorrect
        );
      }

      if (!Array.isArray(user.statistics)) {
        user.statistics = [];
      }

      for (let index = 0; index < allTopics.length; index++) {
        const topic = allTopics[index];
        const existedTopicIndex = (user.statistics || []).findIndex(f => f.topicName === topic.title);
        const data = {
          topicName: topic.title,
          scored: userAnswers.filter(a => (a.topic.id === topic.id) && a.answeredCorrectly).length,
          total: allAnswers.filter(a => (a.topic.id === topic.id) && a.isCorrect).length,
        };
        if (existedTopicIndex !== -1) {
          user.statistics[existedTopicIndex] = data;
        } else {
          user.statistics.push(data);
        }
      }

      await this.repository.update(user.id, user);
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
          usernamemaster: decodeURIComponent(username)
        }
      });

      return user;
    }
    //#endregion
  }


  //#region @websql
  async initExampleDbData() { }
  //#endregion

}

//#region imports
import { Taon } from 'taon/src';
import { _ } from 'tnp-core/src';

import { Answer } from '../answer/answer';
import { Question } from '../question';
import { Topic } from '../topic';

import { User } from './user';
import { Stats } from './user.models';
//#endregion
@Taon.Controller({
  className: 'UserController',
})
export class UserController extends Taon.Base.CrudController<User> {
  entityClassResolveFn = (): typeof User => User;
  get userRepository(): Taon.Base.Repository<User> {
    return this.db;
  }
  questionRepository = this.injectRepo(Question);
  topicRepository = this.injectRepo(Topic);
  answerRepository = this.injectRepo(Answer);
  /**
   *
   * @param corectAnswersIds
   * @param username should be encoded encodeURIComponent
   * @returns
   */
  @Taon.Http.POST('/submit/user/:username') //
  submit(
    @Taon.Http.Param.Body('answers')
    corectAnswersIds: Number[],
    @Taon.Http.Param.Path('username')
    username: string,
    @Taon.Http.Param.Query('onlyTopicId')
    onlyTopicId: Number,
  ): Taon.Response<User> {
    //#region @websqlFunc
    return async (req, res) => {
      //
      username = decodeURIComponent(username);
      const userExists =
        (await this.userRepository.count({
          where: {
            username,
          },
        })) > 0;
      if (userExists) {
        throw new Error(`Username exists or not correct`);
      }
      let user = await this.userRepository.save(
        User.from({
          username,
        }),
      );
      const allTopics = (await this.topicRepository.find()) as Topic[];
      const allQuestions = (await this.questionRepository.find()) as Question[];
      const allAnswers = (await this.answerRepository.find()) as Answer[];
      for (let index = 0; index < allAnswers.length; index++) {
        const answer = allAnswers[index];
        answer.topic = allTopics.find(topic => {
          const question = allQuestions.find(q => q.id === answer.questionId);
          return topic.id === question.topicId;
        });
      }
      let userAnswers = corectAnswersIds.map(id => {
        const answerFromDB = allAnswers.find(a => a.id == id);
        const answer = answerFromDB.clone({});
        answer.userAnswer = true;
        answer.topic = Topic.from(answer.topic);
        return answer;
      });
      const updateOnlyForTopicId =
        _.isNumber(onlyTopicId) && !_.isNaN(onlyTopicId);
      if (updateOnlyForTopicId) {
        userAnswers = userAnswers.filter(f => onlyTopicId === f.topic.id);
      }
      for (let index = 0; index < userAnswers.length; index++) {
        const userAnswer = userAnswers[index];
        userAnswer.answeredCorrectly =
          userAnswer.userAnswer ===
          allAnswers.find(a => a.id == userAnswer.id).isCorrect;
      }
      if (!Array.isArray(user.statistics)) {
        user.statistics = [];
      }
      for (let index = 0; index < allTopics.length; index++) {
        const topic = allTopics[index];
        const existedTopicIndex = (user.statistics || []).findIndex(
          f => f.topicName === topic.title,
        );
        const data = {
          topicName: topic.title,
          scored: userAnswers.filter(
            a => a.topic.id === topic.id && a.answeredCorrectly,
          ).length, //
          total: allAnswers.filter(a => a.topic.id === topic.id && a.isCorrect)
            .length,
        };
        if (existedTopicIndex !== -1) {
          user.statistics[existedTopicIndex] = data;
        } else {
          user.statistics.push(data);
        }
      }
      await this.userRepository.updateById(user.id, user);
      return user;
    };
    //#endregion
  }
  @Taon.Http.POST('/stats/for/user/:username') //
  getByUsername(
    @Taon.Http.Param.Path('username')
    username: string,
  ): Taon.Response<User> {
    //#region @websqlFunc
    return async (req, res) => {
      //
      const user = await this.db.findOne({
        where: {
          username: decodeURIComponent(username),
        },
      });
      return user;
    };
    //#endregion
  }
  //#region @websql
  async initExampleDbData() {}
  //#endregion
}
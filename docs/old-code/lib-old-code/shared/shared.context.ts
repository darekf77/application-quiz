//#region imports
import { Taon, TaonBaseContext } from 'taon/src';

import { Answer } from './answer';
import { AnswerController } from './answer/answer.controller';
import { Question } from './question';
import { QuestionController } from './question/question.controller';
import { Topic } from './topic';
import { TopicController } from './topic/topic.controller';
import { User } from './user';
import { UserController } from './user/user.controller';
//#endregion

export const SharedContext = Taon.createContext(() => ({
  contextName: 'SharedContext',
  abstract: true,
  contexts: { TaonBaseContext },
  controllers: {
    TopicController,
    QuestionController,
    AnswerController,
    UserController,
    // PUT TAON CONTROLLERS HERE
  },
  entities: {
    Topic,
    Question,
    Answer,
    User,
    // PUT TAON ENTITIES HERE
  },
  logs: true,
}));

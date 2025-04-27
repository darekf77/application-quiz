import { Taon,BaseContext } from 'taon/src';
import { TopicController } from './topic/topic.controller';
import { QuestionController } from './question/question.controller';
import { AnswerController } from './answer/answer.controller';
import { UserController } from './user/user.controller';
import { Topic } from './topic';
import { Question } from './question';
import { Answer } from './answer';
import { User } from './user';

export const SharedContext = Taon.createContext(() => ({
  contextName: 'SharedContext',
  abstract: true,
  contexts: { BaseContext },
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

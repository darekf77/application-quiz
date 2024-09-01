import { Taon } from 'firedev/src';
import { HOST_BACKEND_PORT } from './app.hosts';
const host = 'http://localhost:' + HOST_BACKEND_PORT;
import { SharedContext } from 'application-quiz/src';

export const ApplicationQuizContext = Taon.createContext(() => ({
  contextName: 'ApplicationQuizContext',
  host,
  contexts: { SharedContext },
  database: true,
  logs: {
    db: false,
    framework: true,
    server: true,
  },
}));

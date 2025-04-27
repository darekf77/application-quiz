import { Taon } from 'taon/src';
import {
  CLIENT_DEV_NORMAL_APP_PORT,
  CLIENT_DEV_WEBSQL_APP_PORT,
  HOST_BACKEND_PORT,
} from './app.hosts';
const host = 'http://localhost:' + HOST_BACKEND_PORT;
const frontendHost =
  'http://localhost:' +
  (Helpers.isWebSQL ? CLIENT_DEV_WEBSQL_APP_PORT : CLIENT_DEV_NORMAL_APP_PORT);
import { SharedContext } from 'application-quiz/src';
import { Helpers } from 'tnp-core/src';

export const ApplicationQuizContext = Taon.createContext(() => ({
  contextName: 'ApplicationQuizContext',
  host,
  frontendHost,
  contexts: { SharedContext },
  database: true,
  logs: {
    db: false,
    framework: true,
    server: true,
  },
}));

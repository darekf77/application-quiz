//#region imports
import { SharedContext } from '@darekf77/application-quiz/src';
import { Taon } from 'taon/src';
import { UtilsOs } from 'tnp-core/src';

import {
  CLIENT_DEV_NORMAL_APP_PORT,
  CLIENT_DEV_WEBSQL_APP_PORT,
  HOST_BACKEND_PORT,
} from './app.hosts';
import { MIGRATIONS_CLASSES_FOR_ApplicationQuizContext } from './migrations';
//#endregion
const host = 'http://localhost:' + HOST_BACKEND_PORT;
const frontendHost =
  'http://localhost:' +
  (UtilsOs.isRunningInWebSQL()
    ? CLIENT_DEV_WEBSQL_APP_PORT
    : CLIENT_DEV_NORMAL_APP_PORT);
export const ApplicationQuizContext = Taon.createContext(() => ({
  contextName: 'ApplicationQuizContext',
  host,

  frontendHost,
  contexts: { SharedContext },
  database: {
    recreateMode: 'DROP_DB+MIGRATIONS',
    // recreateMode: 'PRESERVE_DATA+MIGRATIONS'
  },
  migrations: {
    ...MIGRATIONS_CLASSES_FOR_ApplicationQuizContext,
  },
  logs: {
    db: false,
    framework: true,
    server: true,
    migrations: true,
  },
}));

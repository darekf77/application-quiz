//#region imports
import { SharedContext } from '@darekf77/application-quiz/src';
import { Taon } from 'taon/src';
import { UtilsOs } from 'tnp-core/src';

import {
  CLIENT_DEV_NORMAL_APP_PORT,
  CLIENT_DEV_WEBSQL_APP_PORT,
  HOST_BACKEND_PORT,
  HOST_CONFIG,
} from './app.hosts';
import { MIGRATIONS_CLASSES_FOR_ApplicationQuizContext } from './migrations';
//#endregion

export const ApplicationQuizContext = Taon.createContext(() => ({
  ...HOST_CONFIG['ApplicationQuizContext'],
  contexts: { SharedContext },
  database: true,
  migrations: MIGRATIONS_CLASSES_FOR_ApplicationQuizContext,
  logs: {
    db: false,
    framework: true,
    server: true,
    migrations: true,
  },
}));

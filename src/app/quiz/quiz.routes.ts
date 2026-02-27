//#region imports
import { Routes } from '@angular/router';

import { QuizContainer } from './quiz.container';
//#endregion

export const QuizRoutes: Routes = [
  {
    path: '',
    component: QuizContainer,
  },
  // {
  //   path: 'anothermodulepath',
  //   loadChildren: () => import('anothermodule')
  //     .then(m => m.AnotherLazyModule),
  // },
];

/**
 * By default exporting QuizRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
export default QuizRoutes;
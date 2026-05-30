//#region imports
import { Routes } from '@angular/router';

import { StatsContainer } from './stats.container';
//#endregion

export const StatsRoutes: Routes = [
  {
    path: '',
    component: StatsContainer,
    pathMatch: 'full',
  },
  {
    path: ':username',
    component: StatsContainer,
  },
];

/**
 * By default exporting StatsRoutes,
 * the command `taon generate:app:routes`
 * will automatically add them to the root routes in ./src/app.ts.
 */
export default StatsRoutes;

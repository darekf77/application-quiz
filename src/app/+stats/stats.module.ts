//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '@darekf77/application-quiz/src';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon/src';

import { StatsContainer } from './stats.container';
//#endregion
const routes: Routes = [
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
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TaonFullMaterialModule,
    StaticColumnsModule,
    UserComponent,
  ],
  declarations: [StatsContainer],
})
export class StatsModule {}
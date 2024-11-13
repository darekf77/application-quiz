//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatsContainer } from './stats.container';
import { UserComponent } from 'application-quiz/src';
import { TaonFullMaterialModule } from 'taon/src';
import { StaticColumnsModule } from 'static-columns/src';

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
//#endregion

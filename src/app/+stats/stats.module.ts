//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StatsContainer } from './stats.container';
import { UserComponent } from '../../lib';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { StaticColumnsModule } from 'static-columns';

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
    FiredevFullMaterialModule,
    StaticColumnsModule,
    UserComponent,
  ],
  declarations: [StatsContainer],
})
export class StatsModule { }
//#endregion

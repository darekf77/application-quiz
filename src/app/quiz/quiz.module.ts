//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizContainer } from './quiz.container';
import { StaticColumnsModule } from 'static-columns';
import { FiredevFullMaterialModule } from 'firedev-ui';

const routes: Routes = [
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StaticColumnsModule,
    FiredevFullMaterialModule,
  ],
  declarations: [QuizContainer],
})
export class QuizModule { }
//#endregion

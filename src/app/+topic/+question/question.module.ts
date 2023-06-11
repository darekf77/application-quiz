//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionContainer } from './question.container';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { QuestionEffects } from './effects/question.effects';
import { questionFeatureKey } from './question.models';
import { questionReducer } from './reducers/question.reducers';
import { QuestionService } from './services/question.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuestionContainer,
  },
  {
    path: 'inside/:id',
    component: QuestionContainer,
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(questionFeatureKey, questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
  ],
  declarations: [QuestionContainer],
  providers: [QuestionService],
})
export class QuestionModule { }
//#endregion
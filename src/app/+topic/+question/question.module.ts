import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AnswerModule, QuestionModule } from 'application-quiz/src';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon/src';

import { QuestionEffects } from './effects/question.effects';
import { QuestionContainer } from './question.container';
import { questionFeatureKey } from './question.models';
import { questionReducer } from './reducers/question.reducers';
import { QuestionService } from './services/question.service';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuestionContainer,
  },
  {
    path: 'num/:questionOid',
    component: QuestionContainer,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(questionFeatureKey, questionReducer),
    EffectsModule.forFeature([QuestionEffects]),
    TaonFullMaterialModule,
    StaticColumnsModule,
    AnswerModule,
    QuestionModule,
  ],
  declarations: [QuestionContainer],
  providers: [QuestionService],
})
export class QuestionContainerModule {}

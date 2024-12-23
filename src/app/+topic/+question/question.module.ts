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
import { AnswerModule, QuestionModule } from 'application-quiz/src';
import { TaonFullMaterialModule } from 'taon/src';
import { StaticColumnsModule } from 'static-columns/src';

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
//#endregion

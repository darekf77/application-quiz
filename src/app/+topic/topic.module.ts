//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicModule } from '@darekf77/application-quiz/src';
import { MtxAlertModule } from '@ng-matero/extensions/alert';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon-ui/src';

import { TopicEffects } from './effects/topic.effects';
import { topicReducer } from './reducers/topic.reducers';
import { TopicService } from './services/topic.service';
import { TopicContainer } from './topic.container';
import { topicFeatureKey } from './topic.models';
//#endregion
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicContainer,
  },
  {
    path: 'topic/:topicTitleKebabCase',
    component: TopicContainer,
    children: [
      {
        path: 'question',
        loadChildren: () =>
          import('./+question/question.module').then(
            m => m.QuestionContainerModule,
          ),
      },
    ],
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(topicFeatureKey, topicReducer),
    EffectsModule.forFeature([TopicEffects]),
    TaonFullMaterialModule,
    StaticColumnsModule,
    TopicModule,
    MtxAlertModule,
    SweetAlert2Module.forRoot({}),
  ],
  declarations: [TopicContainer],
  providers: [TopicService],
})
export class TopicContainerModule {}

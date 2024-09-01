//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicContainer } from './topic.container';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TopicEffects } from './effects/topic.effects';
import { topicFeatureKey } from './topic.models';
import { topicReducer } from './reducers/topic.reducers';
import { TopicService } from './services/topic.service';
import { RouterModule, Routes } from '@angular/router';
import { TopicModule } from 'application-quiz/src';
import { TaonFullMaterialModule } from 'firedev-ui/src';
import { StaticColumnsModule } from 'static-columns/src';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MtxAlertModule } from '@ng-matero/extensions/alert';

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
//#endregion

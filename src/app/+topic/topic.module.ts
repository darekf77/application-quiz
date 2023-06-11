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

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopicContainer,
  },
  {
    path: 'topic/:topicId',
    component: TopicContainer,
  },
  {
    path: 'topic/:topicId/question',
    loadChildren: () => import('./+question/question.module')
      .then(m => m.QuestionModule),
  },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(topicFeatureKey, topicReducer),
    EffectsModule.forFeature([TopicEffects]),
  ],
  declarations: [TopicContainer],
  providers: [TopicService],
})
export class TopicModule { }
//#endregion

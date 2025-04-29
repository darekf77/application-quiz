import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon/src';

import { TopicComponent } from './topic.component';
@NgModule({
  imports: [CommonModule, TaonFullMaterialModule, StaticColumnsModule],
  declarations: [TopicComponent],
  exports: [TopicComponent],
})
export class TopicModule {}

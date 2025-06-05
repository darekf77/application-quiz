//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon-ui/src';

import { TopicComponent } from './topic.component';
//#endregion
@NgModule({
  imports: [CommonModule, TaonFullMaterialModule, StaticColumnsModule],
  declarations: [TopicComponent],
  exports: [TopicComponent],
})
export class TopicModule {}

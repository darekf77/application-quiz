//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'firedev-ui/src';

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule, StaticColumnsModule],
  declarations: [TopicComponent],
  exports: [TopicComponent],
})
export class TopicModule {}
//#endregion

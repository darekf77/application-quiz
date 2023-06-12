//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { StaticColumnsModule } from 'static-columns';
import { FiredevFullMaterialModule } from 'firedev-ui';

@NgModule({
  imports: [
    CommonModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
  ],
  declarations: [TopicComponent],
  exports: [TopicComponent],
})
export class TopicModule { }
//#endregion

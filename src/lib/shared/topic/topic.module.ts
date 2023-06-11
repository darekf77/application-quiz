//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TopicComponent],
  exports: [TopicComponent],
})
export class TopicModule { }
//#endregion
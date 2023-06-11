//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerComponent } from './answer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AnswerComponent],
  exports: [AnswerComponent],
})
export class AnswerModule { }
//#endregion
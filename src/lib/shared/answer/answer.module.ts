//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerComponent } from './answer.component';
import { TaonFullMaterialModule } from 'taon-ui/src';

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule],
  declarations: [AnswerComponent],
  exports: [AnswerComponent],
})
export class AnswerModule {}
//#endregion

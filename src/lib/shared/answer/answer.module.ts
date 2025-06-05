//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaonFullMaterialModule } from 'taon-ui/src';

import { AnswerComponent } from './answer.component';
//#endregion

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule],
  declarations: [AnswerComponent],
  exports: [AnswerComponent],
})
export class AnswerModule {}
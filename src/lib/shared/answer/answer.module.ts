import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaonFullMaterialModule } from 'taon/src';

import { AnswerComponent } from './answer.component';

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule],
  declarations: [AnswerComponent],
  exports: [AnswerComponent],
})
export class AnswerModule {}

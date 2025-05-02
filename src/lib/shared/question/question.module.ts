//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TaonFullMaterialModule } from 'taon/src';

import { QuestionComponent } from './question.component';
//#endregion

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule],
  declarations: [QuestionComponent],
  exports: [QuestionComponent],
})
export class QuestionModule {}
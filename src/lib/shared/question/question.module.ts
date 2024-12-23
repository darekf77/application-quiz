//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { TaonFullMaterialModule } from 'taon/src';

@NgModule({
  imports: [CommonModule, TaonFullMaterialModule],
  declarations: [QuestionComponent],
  exports: [QuestionComponent],
})
export class QuestionModule {}
//#endregion

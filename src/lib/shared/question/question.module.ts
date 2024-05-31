//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question.component';
import { FiredevFullMaterialModule } from 'firedev-ui/src';

@NgModule({
  imports: [CommonModule, FiredevFullMaterialModule],
  declarations: [QuestionComponent],
  exports: [QuestionComponent],
})
export class QuestionModule {}
//#endregion

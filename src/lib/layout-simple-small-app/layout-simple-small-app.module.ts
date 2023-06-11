//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutSimpleSmallAppComponent } from './layout-simple-small-app.component';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    NgScrollbarModule,
    FiredevFullMaterialModule,
  ],
  declarations: [LayoutSimpleSmallAppComponent],
  exports: [LayoutSimpleSmallAppComponent],
})
export class LayoutSimpleSmallAppModule { }
//#endregion

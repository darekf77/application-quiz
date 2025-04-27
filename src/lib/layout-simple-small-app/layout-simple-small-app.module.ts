//#region @browser
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutSimpleSmallAppComponent } from './layout-simple-small-app.component';
import { TaonFullMaterialModule } from 'taon/src';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StaticColumnsModule } from 'static-columns/src';

@NgModule({
  imports: [
    CommonModule,
    NgScrollbarModule,
    TaonFullMaterialModule,
    StaticColumnsModule,
  ],
  declarations: [LayoutSimpleSmallAppComponent],
  exports: [LayoutSimpleSmallAppComponent],
})
export class LayoutSimpleSmallAppModule {}
//#endregion

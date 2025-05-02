//#region imports
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon/src';

import { LayoutSimpleSmallAppComponent } from './layout-simple-small-app.component';
//#endregion
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
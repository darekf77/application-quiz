//#region @browser
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'layout-simple-small-app',
  templateUrl: './layout-simple-small-app.component.html',
  styleUrls: ['./layout-simple-small-app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutSimpleSmallAppComponent implements OnInit {
  @HostBinding('style.minHeight.px') @Input() height: number = 100;
  handlers: Subscription[] = [];
  @Output() layoutSimpleSmallAppDataChanged = new EventEmitter();
  @Input() layoutSimpleSmallAppData: any = {};

  constructor() {}

  ngOnInit() {}

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }
}
//#endregion

//#region imports
import {
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
//#endregion

@Component({
  selector: 'layout-simple-small-app',
  standalone: false,
  templateUrl: './layout-simple-small-app.component.html',
  styleUrls: ['./layout-simple-small-app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutSimpleSmallAppComponent implements OnDestroy {
  @HostBinding('style.minHeight.px')
  @Input()
  height: number = 100;

  handlers: Subscription[] = [];

  @Output()
  layoutSimpleSmallAppDataChanged = new EventEmitter();

  @Input()
  layoutSimpleSmallAppData: any = {};

  private router: Router = inject(Router);

  constructor() {}

  onHeaderClick() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.handlers.forEach(h => h.unsubscribe());
  }
}

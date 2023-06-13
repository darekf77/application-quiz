//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { User } from '../../lib';
import { AppService } from '../../app.store';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.container.html',
  styleUrls: ['./stats.container.scss']
})
export class StatsContainer implements OnInit {

  user$: Observable<User>;

  @Input('username')
  set id(username: string) {
    if (username) {
      username = decodeURIComponent(username);
      this.user$ = User.ctrl.getByUsername(encodeURIComponent(username)).received.observable.pipe(map(data => {
        return data.body.json;
      }))
    } else {
      this.user$ = of(void 0)
    }
  }

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }

  onUserGoTo(username: string) {
    this.appService.goToStats(username);
  }

}
//#endregion

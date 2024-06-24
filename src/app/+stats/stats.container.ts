//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription, map, of } from 'rxjs';
import { User } from 'application-quiz/src';
import { AppService } from '../../app.store';
import { ApplicationQuizContext } from '../../app.context';
import { Firedev } from 'firedev/src';
import { UserController } from 'application-quiz/src';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.container.html',
  styleUrls: ['./stats.container.scss'],
})
export class StatsContainer {
  user$: Observable<User>;

  userController = Firedev.inject(() =>
    ApplicationQuizContext.get(UserController),
  );

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('username')
  set id(username: string) {
    if (username) {
      username = decodeURIComponent(username);
      this.user$ = this.userController
        .getByUsername(encodeURIComponent(username))
        .received.observable.pipe(
          map(data => {
            return data.body.json;
          }),
        );
    } else {
      this.user$ = of(void 0);
    }
  }

  constructor(private appService: AppService) {}

  onUserGoTo(username: string) {
    this.appService.goToStats(username);
  }
}
//#endregion

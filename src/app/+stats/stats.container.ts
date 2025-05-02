//#region imports
import { Component, Input, OnInit } from '@angular/core';
import { User } from '@darekf77/application-quiz/src';
import { UserController } from '@darekf77/application-quiz/src';
import { Observable, Subscription, map, of } from 'rxjs';
import { Taon } from 'taon/src';

import { ApplicationQuizContext } from '../../app.context';
import { AppService } from '../../app.store';
//#endregion

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.container.html',
  styleUrls: ['./stats.container.scss'],
})
export class StatsContainer {
  user$: Observable<User>;
  userController = Taon.inject(() =>
    ApplicationQuizContext.getClass(UserController),
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
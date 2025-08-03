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
export class StatsContainer implements OnInit {
  context: typeof ApplicationQuizContext;
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
            console.log('user data', data); // @LAST is ipc mode entity mapping does not work !
            return User.from(data.body.json);
          }),
        );
    } else {
      this.user$ = of(void 0);
    }
  }
  constructor(private appService: AppService) {
    this.context = ApplicationQuizContext;
  }
  onUserGoTo(username: string) {
    this.appService.goToStats(username);
  }
  ngOnInit(): void {
    // console.log('ngOnInit', this.context);
  }
}

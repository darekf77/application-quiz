//#region imports
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  User,
  UserComponent,
  UserService,
} from '@darekf77/application-quiz/src';
import { UserController } from '@darekf77/application-quiz/src';
import { Observable, Subscription, map, of } from 'rxjs';
import { Taon } from 'taon/src';

import { AppService } from '../../app.store';
//#endregion

@Component({
  selector: 'app-stats',
  templateUrl: './stats.container.html',
  styleUrls: ['./stats.container.scss'],
  imports: [CommonModule, UserComponent],
  providers: [UserService],
})
export class StatsContainer implements OnInit {
  router = inject(Router);

  activatedRoute = inject(ActivatedRoute);

  user$: Observable<User>;

  userApiService = inject(UserService);

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('username')
  set id(username: string) {
    if (username) {
      username = decodeURIComponent(username);
      console.log('ASSIGNING ARRRA OBSERVABLE');
      this.user$ = this.userApiService.entityCrudController
        .getByUsername(encodeURIComponent(username))
        .request()
        .observable.pipe(
          map(data => {
            console.log('user data', data); // @LAST is ipc mode entity mapping does not work !
            return new User().clone(data.body.json);
          }),
        );
    }
  }

  onUserGoTo(username: string) {
    this.router.navigate([`../stats/${username}`], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnInit(): void {
    // console.log('ngOnInit', this.context);
  }
}

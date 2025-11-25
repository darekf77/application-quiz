//#region imports
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MtxGridColumn } from '@ng-matero/extensions/grid';
import { StaticColumnsModule } from 'static-columns/src';
import { TaonFullMaterialModule } from 'taon-ui/src';
import { TaonTableModule } from 'taon-ui/src';

import { SharedContext } from '../shared.context';

import { User } from './user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
//#endregion

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService],
  imports: [
    CommonModule,
    TaonFullMaterialModule,
    StaticColumnsModule,
    TaonTableModule,
  ],
  standalone: true,
})
export class UserComponent {
  private userService = inject(UserService);

  public entityCrudController: UserController;

  @Input() context: typeof SharedContext;

  @Input() user: User;

  @Output() userGoTo = new EventEmitter();

  statsColumns = [
    {
      header: 'Topic Name',
      field: 'topicName',
    },
    {
      header: 'Scored',
      field: 'scored',
      maxWidth: 100,
    },
    {
      header: 'Total',
      field: 'total',
      maxWidth: 100,
    },
  ] as MtxGridColumn[];

  usersColumns = [
    {
      header: 'ID',
      field: 'id',
      maxWidth: 100,
    },
    {
      header: 'Username',
      field: 'username',
    },
    {
      header: 'Go To Score Page',
      field: 'goto',
      right: '0px',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'Go To Score Page',
          icon: 'navigate_next',
          tooltip: 'Go To Score Page',
          disabled: false,
          click: (user: User) => {
            this.userGoTo.next(user.username);
          },
        },
      ],
    },
  ];

  constructor() {
    this.entityCrudController = this.userService.entityCrudController;
  }
}

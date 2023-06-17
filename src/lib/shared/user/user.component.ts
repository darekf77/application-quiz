//#region @browser
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { StaticColumnsModule } from 'static-columns';
import { User } from './user';
import { FiredevTableModule } from 'firedev-ui';
import { MtxGridColumn } from '@ng-matero/extensions/grid';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService],
  standalone: true,
  imports: [
    CommonModule,
    FiredevFullMaterialModule,
    StaticColumnsModule,
    FiredevTableModule,
  ],
})
export class UserComponent implements OnInit {
  entity = User;
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
      maxWidth: 100
    },
    {
      header: 'Total',
      field: 'total',
      maxWidth: 100
    }
  ] as MtxGridColumn[];

  usersColumns = [
    {
      header: 'ID',
      field: 'id',
      maxWidth: 100
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
            this.userGoTo.next(user.usernamemaster);
          },
        }
      ],
    }
  ]

  constructor(
    protected service: UserService,
  ) { }

  ngOnInit() {
  }

}
//#endregion

//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { CommonModule } from '@angular/common';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { StaticColumnsModule } from 'static-columns';
import { User } from './user';

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
  ],
})
export class UserComponent implements OnInit {
  @Input() user: User;
  constructor(
    protected service: UserService
  ) { }

  ngOnInit() {
  }

}
//#endregion

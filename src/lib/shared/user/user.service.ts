//#region imports
import { Injectable } from '@angular/core';
import { Taon } from 'taon/src';

import { SharedContext } from '../shared.context';

import { UserController } from './user.controller';
//#endregion
@Injectable({
  providedIn: 'root',
})
export class UserService {
  entityCrudController: UserController;
  constructor() {}

  init(context: typeof SharedContext = SharedContext) {
    this.entityCrudController = Taon.inject(() =>
      context.getClass(UserController),
    );
  }
}

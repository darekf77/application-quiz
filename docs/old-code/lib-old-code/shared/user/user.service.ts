//#region imports
import { Injectable } from '@angular/core';
import { Taon } from 'taon/src';
import { TaonBaseAngularService } from 'taon/src';

import { SharedContext } from '../shared.context';

import { UserController } from './user.controller';

//#endregion

@Injectable({
  providedIn: 'root',
})
export class UserService extends TaonBaseAngularService {
  entityCrudController = this.injectController(UserController);
}

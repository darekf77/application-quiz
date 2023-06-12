//#region #browser

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'tnp-core'
//#region @notForNpm
import { AppService } from '../../../app.store';
//#endregion

@Injectable()
export class TopicService {
  constructor(
    public appService: AppService) {

  }
}
//#endregion

//#region @browser
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { _ } from 'tnp-core'
import { AppService } from '../../../app.store';

@Injectable()
export class TopicService {
  constructor(
    public appService: AppService,

    ) {

  }
}
//#endregion

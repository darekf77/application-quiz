//#region imports
import { Injectable } from '@angular/core';
import { TaonBaseAngularService } from 'taon/src';

import { TopicController } from './topic.controller';
//#endregion

@Injectable()
export class TopicService extends TaonBaseAngularService {
  topicController = this.injectController(TopicController);
}

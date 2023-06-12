//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionInitialState } from './question.models';
import * as questionSelectors from './selectors/question.selectors';
import * as questionAction from './actions/question.actions';
import { Observable, firstValueFrom, map, of, share, tap } from 'rxjs';
import { _ } from 'tnp-core';
import { ITopic, Question } from '../../../lib';
import { AppService, appActions, appSelectors } from '../../../app.store';

@Component({
  selector: 'app-question',
  templateUrl: './question.container.html',
  styleUrls: ['./question.container.scss']
})
export class QuestionContainer {
  constructor(
    private store: Store<QuestionInitialState>,
    private appService: AppService,
  ) { }

  question$: Observable<Question>;


  @Input('questionOid')
  set id(questionOid) {
    if (!_.isNil(questionOid)) {
      questionOid = Number(questionOid)
    }
    if (_.isNumber(questionOid) && !_.isNaN(questionOid)) {
      this.question$ = this.store.select(questionSelectors.getCurrentQuestion).pipe(
        map(q => Question.from(q)),
      );
      this.store.dispatch(questionAction.FETCH_QUESTION({ questionOid }))
    } else {
      this.question$ = of(void 0)
    }
  }

  async goNext(q: Question) {
    const topic = await firstValueFrom(this.store.select(appSelectors.selectedTopic));
    this.appService.go(topic.topicTitleKebabCase, q.nextOid);
  }

  async goPrev(q: Question) {
    const topic = await firstValueFrom(this.store.select(appSelectors.selectedTopic));
    this.appService.go(topic.topicTitleKebabCase, q.prevOid);
  }

  ngOnInit(): void {

  }

}
//#endregion

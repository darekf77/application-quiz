//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionInitialState } from './question.models';
import * as questionSelectors from './selectors/question.selectors';
import * as questionAction from './actions/question.actions';
import { Observable, map, of, share, tap } from 'rxjs';
import { _ } from 'tnp-core';
import { Question } from '../../../lib';

@Component({
  selector: 'app-question',
  templateUrl: './question.container.html',
  styleUrls: ['./question.container.scss']
})
export class QuestionContainer {
  constructor(
    private store: Store<QuestionInitialState>
  ) { }

  question$: Observable<Question>;

  @Input('topicTitleKebabCase') title: string;

  @Input('questionOid')
  set id(questionOid) {
    if (!_.isNil(questionOid)) {
      questionOid = Number(questionOid)
    }

    if (_.isNumber(questionOid) && !_.isNaN(questionOid)) {
      this.question$ = this.store.select(questionSelectors.getCurrentQuestion).pipe(
        map(q => Question.from(q)),
        // share(),
        tap(console.log)
      );
      const { title: topicTitleKebabCase } = this;
      if (topicTitleKebabCase) {

        this.store.dispatch(questionAction.FETCH_QUESTION({ questionOid, topicTitleKebabCase }))
      }

    } else {
      this.question$ = of(void 0)
    }
  }

  ngOnInit(): void {

  }

}
//#endregion

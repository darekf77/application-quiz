//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionInitialState } from './question.models';
import * as questionSelectors from './selectors/question.selectors';
import * as questionAction from './actions/question.actions';
import { Observable, map, of } from 'rxjs';
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

  @Input('topicId') topicTitleKebakCase: string;

  questionId: number;

  @Input('questionId')// from routing
  set id(questionID: string) {
    console.log({
      questionID
    })
    const id = Number(questionID)
    if (_.isNumber(id) && !_.isNaN(id)) {
      this.question$ = this.store.select(questionSelectors.getCurrentQuestion).pipe(
        map(q => Question.from(q))
      );
      this.questionId = id;
      this.store.dispatch(questionAction.FETCH_QUESTIONS({ questionId: id }))
    } else {
      this.question$ = of(void 0)
      this.questionId = null;
    }
  }


}
//#endregion

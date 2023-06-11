//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { QuestionInitialState } from './question.models';
import * as questionSelectors from './selectors/question.selectors';
import * as questionAction from './actions/question.actions';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.container.html',
  styleUrls: ['./question.container.scss']
})
export class QuestionContainer implements OnInit {
  constructor(
    private store: Store<QuestionInitialState>
  ) { }

  allData$: Observable<any>;

  @Input('id') // from routing
  set id(idFromRouting: string) {
    if (idFromRouting) {
      this.allData$ = this.store.select(questionSelectors.filterAllBatchesBy(idFromRouting));
    } else {
      this.allData$ = of([]);
    }
  }

  trackByMethod(index: number, item: any): number {
    return item.id;
  }

  undo() {
    this.store.dispatch(questionAction.UNDO({}))
  }

  ngOnInit() { }

}
//#endregion
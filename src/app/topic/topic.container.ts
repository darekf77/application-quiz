//#region @browser
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TopicInitialState } from './topic.models';
import * as topicSelectors from './selectors/topic.selectors';
import * as topicAction from './actions/topic.actions';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.container.html',
  styleUrls: ['./topic.container.scss']
})
export class TopicContainer implements OnInit {
  constructor(
    private store: Store<TopicInitialState>
  ) { }

  allData$: Observable<any>;

  @Input('id') // from routing
  set id(idFromRouting: string) {
    console.log({
      idFromRouting
    })
    this.allData$ = of([]);
    // if (idFromRouting) {
    //   this.allData$ = this.store.select(topicSelectors.filterAllBatchesBy(idFromRouting));
    // } else {
    //   this.allData$ = of([]);
    // }
  }

  trackByMethod(index: number, item: any): number {
    return item.id;
  }

  undo() {
    this.store.dispatch(topicAction.UNDO({}))
  }

  ngOnInit() { }

}
//#endregion

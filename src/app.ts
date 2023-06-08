//#region @notForNpm

//#region @browser
import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-application-quiz',
  template: 'hello from application-quiz',
  styles: [` body { margin: 0px !important; } `],
})
export class ApplicationQuizComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}

@NgModule({
  imports: [],
  exports: [ApplicationQuizComponent],
  declarations: [ApplicationQuizComponent],
  providers: [],
})
export class ApplicationQuizModule { }
//#endregion


async function start(port: number) {
  console.log('hello world');
}

export default start;



//#endregion
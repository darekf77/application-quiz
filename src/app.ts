//#region @notForNpm

//#region imports
import { Firedev } from 'firedev';
import { _ } from 'tnp-core';
const host = 'http://localhost:4199';
import {
  Answer, AnswerController, Question, QuestionController,
  Topic, TopicController, User, UserController
} from './lib';
//#region @browser
import { LayoutSimpleSmallAppModule } from './lib';
import { Input, NgModule, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, Router, RouterModule, Routes } from "@angular/router";
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatMenuTrigger } from '@angular/material/menu';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { AppEffects, AppState, RouterSerializer, appActions, appSelectors, metaReducers, reducers, AppService } from './app.store';
import { CommonModule } from '@angular/common';
//#endregion
//#endregion

//#region @browser

//#region routes
const routes: Routes = [
  {
    path: '',
    redirectTo: 'quiz',
    pathMatch: 'full',
  },
  {
    path: 'quiz',
    loadChildren: () => import('./app/+topic/topic.module')
      .then(m => m.TopicContainerModule),
  },
  {
    path: 'stats',
    loadChildren: () => import('./app/+stats/stats.module')
      .then(m => m.StatsModule),
  },
];
//#endregion

//#region main component
@Component({
  selector: 'app-application-quiz',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
})
export class ApplicationQuizComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  topics$ = this.store.select(appSelectors.allTopics);
  selected$ = this.store.select(appSelectors.selectedTopic);
  showQuizSelect$ = this.store.select(appSelectors.showQuizSelect);
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  changeTopic({ topicTitleKebabCase }: Topic) {
    this.store.dispatch(appActions.CHANGE_TOPIC({ topicTitleKebabCase }));
  }
  someMethod() {
    this.trigger.openMenu();
  }
  async ngOnInit() {
    this.store.dispatch(appActions.INIT());
  }
}
//#endregion

//#region main module
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      bindToComponentInputs: true
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterSerializer,
    }),
    LayoutSimpleSmallAppModule,
    FiredevFullMaterialModule,
    MaterialCssVarsModule.forRoot({
      // all optional
      isAutoContrast: true,
      primary: '#4758b8',
      accent: '#fedfdd'
      // ...
    }),
  ],
  exports: [ApplicationQuizComponent],
  declarations: [ApplicationQuizComponent],
  providers: [AppService],
})
export class ApplicationQuizModule { }
//#endregion

//#endregion

//#region firedev start function
async function start() {
  // Firedev.enableProductionMode();

  //#region init context
  const context = await Firedev.init({
    host,
    controllers: [
      TopicController,
      QuestionController,
      AnswerController,
      UserController,
      // PUT FIREDEV CONTORLLERS HERE
    ],
    entities: [
      Topic,
      Question,
      Answer,
      User,
      // PUT FIREDEV ENTITIES HERE
    ],
    //#region @websql
    config: {
      type: 'better-sqlite3',
      database: 'tmp-db.sqlite',
      logging: false,
    }
    //#endregion
  });
  //#endregion

  //#region @backend
  if (Firedev.isNode) {
    context.node.app.get('/hello', (req, res) => {
      res.send('Hello application-quiz')
    })
  }
  //#endregion
}
//#endregion

export default start;
//#endregion

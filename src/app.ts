//#region @notForNpm
//#region imports
import { Firedev } from 'firedev';
const host = 'http://localhost:4199';
import { Answer, AnswerController, LayoutSimpleSmallAppModule, Question, QuestionController, Topic, TopicController } from './lib';
//#region @browser
import { NgModule, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { FiredevFullMaterialModule } from 'firedev-ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatMenuTrigger } from '@angular/material/menu';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterSerializer, metaReducers, reducers } from './app.store';
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
    loadChildren: () => import('./app/quiz/quiz.module')
      .then(m => m.QuizModule),
  },
  {
    path: 'stats',
    loadChildren: () => import('./app/stats/stats.module')
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
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
  async ngOnInit() {

  }
}
//#endregion

//#region main module
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules,
      enableTracing: false,
      bindToComponentInputs: true
    }),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
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
  providers: [],
})
export class ApplicationQuizModule { }
//#endregion
//#endregion

//#region firedev start function
async function start() {
  // Firedev.enableProductionMode();

  const context = await Firedev.init({
    host,
    controllers: [
      TopicController,
      QuestionController,
      AnswerController,
      // PUT FIREDEV CONTORLLERS HERE
    ],
    entities: [
      Topic,
      Question,
      Answer,
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

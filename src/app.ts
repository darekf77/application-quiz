//#region imports
import { CommonModule } from '@angular/common';
import { NgModule, ViewChild, ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { Topic, TopicController } from '@darekf77/application-quiz/src';
import { LayoutSimpleSmallAppModule } from '@darekf77/application-quiz/src'; // @browser
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialCssVarsModule } from 'angular-material-css-vars';
import { Observable } from 'rxjs';
import { Taon } from 'taon/src';
import { TaonFullMaterialModule, TaonGithubForkMeCornerModule } from 'taon/src'; // @browser
import { _ } from 'tnp-core/src';

import { ApplicationQuizContext } from './app.context';
import {
  AppEffects,
  AppState,
  RouterSerializer,
  appActions,
  appSelectors,
  metaReducers,
  reducers,
  AppService,
} from './app.store'; // @browser
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
    loadChildren: () =>
      import('./app/+topic/topic.module').then(m => m.TopicContainerModule),
  },
  {
    path: 'stats',
    loadChildren: () =>
      import('./app/+stats/stats.module').then(m => m.StatsModule),
  },
];
//#endregion
//#region main component
@Component({
  selector: 'app-application-quiz',
  standalone: false,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
})
export class ApplicationQuizComponent implements OnInit {
  readonly topics$: Observable<Partial<Topic>[]>;
  readonly selected$: Observable<Partial<Topic>>;
  readonly showQuizSelect$: Observable<boolean>;

  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {
    this.topics$ = this.store.select(appSelectors.allTopics);
    this.selected$ = this.store.select(appSelectors.selectedTopic);
    this.showQuizSelect$ = this.store.select(appSelectors.showQuizSelect);
  }

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
      bindToComponentInputs: true,
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
    TaonFullMaterialModule,
    MaterialCssVarsModule.forRoot({
      // all optional
      isAutoContrast: true,
      primary: '#4758b8',
      accent: '#fedfdd',
      // ...
    }),
    TaonGithubForkMeCornerModule,
  ],
  exports: [ApplicationQuizComponent],
  declarations: [ApplicationQuizComponent],
  providers: [AppService],
})
export class ApplicationQuizModule {}
//#endregion
//#endregion

//#region taon start function
async function start() {
  // Taon.enableProductionMode();
  //#region init context
  const context = await ApplicationQuizContext.initialize();
  
  //#endregion
  //#region @backend
  if (Taon.isNode) {
    // context.node.app.get('/hello', (req, res) => {
    //   res.send('Hello application-quiz');
    // });
  }
  //#endregion
  if (Taon.isBrowser) {
    const users = (await context.getInstanceBy(TopicController).getAll().received)
      .body?.json;
    console.log({
      'topics from backend': users,
    });
  }
}
//#endregion
export default start;
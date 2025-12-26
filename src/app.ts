//#region imports
import { CommonModule } from '@angular/common';
import {
  APP_INITIALIZER,
  ApplicationConfig,
  NgModule,
  ViewChild,
  ViewEncapsulation,
  isDevMode,
  mergeApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu'; // @browser
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  PreloadAllModules,
  Router,
  RouterModule,
  Routes,
  provideRouter,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import {
  RenderMode,
  ServerRoute,
  provideServerRendering,
  withRoutes,
} from '@angular/ssr';
import { Topic, TopicController } from '@darekf77/application-quiz/src';
import { LayoutSimpleSmallAppModule } from '@darekf77/application-quiz/src'; // @browser
import { EffectsModule, provideEffects } from '@ngrx/effects';
import {
  provideRouterStore,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { provideStore, Store, StoreModule } from '@ngrx/store';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import {
  MaterialCssVarsModule,
  provideMaterialCssVars,
} from 'angular-material-css-vars';
import { Observable } from 'rxjs';
import { Taon, TAON_CONTEXT } from 'taon/src';
import {
  TaonFullMaterialModule,
  TaonGithubForkMeCornerModule,
} from 'taon-ui/src'; // @browser
import { _, UtilsOs } from 'tnp-core/src';

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

//#region ApplicationQuizClientRoutes
//#region @browser
export const ApplicationQuizClientRoutes: Routes = [
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
//#endregion

//#region main component
//#region @browser
@Component({
  selector: 'app-application-quiz',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.scss'],
  templateUrl: './app.html',
  imports: [
    CommonModule,
    RouterModule,
    LayoutSimpleSmallAppModule,
    TaonFullMaterialModule,
    TaonGithubForkMeCornerModule,
  ],
})
export class ApplicationQuizApp implements OnInit {
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
//#endregion

//#region ApplicationQuizAppConfig
//#region @browser
export const ApplicationQuizAppConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => ApplicationQuizStartFunction,
    },
    AppService,
    {
      provide: TAON_CONTEXT,
      useValue: ApplicationQuizContext,
    },
    provideStore(reducers, { metaReducers }),

    provideEffects(AppEffects),

    provideStoreDevtools({
      maxAge: 25,
      // logOnly: environment.production,
    }),

    provideRouterStore({
      serializer: RouterSerializer,
    }),

    // provideMaterialCssVars({
    //   isAutoContrast: true,
    //   primary: '#4758b8',
    //   accent: '#fedfdd',
    // }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(ApplicationQuizClientRoutes),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
//#endregion
//#endregion

//#region server routes
//#region @browser
export const ApplicationQuizServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
//#endregion
//#endregion

//#region server config
//#region @browser
export const ApplicationQuizServerConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(ApplicationQuizServerRoutes))],
};

export const ApplicationQuizConfig = mergeApplicationConfig(
  ApplicationQuizAppConfig,
  ApplicationQuizServerConfig,
);
//#endregion
//#endregion

//#region taon start function
async function ApplicationQuizStartFunction() {
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
    const users = (
      await context.getInstanceBy(TopicController).getAll().received
    ).body?.json;
    console.log({
      'topics from backend': users,
    });
  }
}
//#endregion

export default ApplicationQuizStartFunction;

//#region imports
import * as os from 'os'; // @backend

import { AsyncPipe, CommonModule, JsonPipe, NgFor } from '@angular/common'; // @browser
import {
  inject,
  Injectable,
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  isDevMode,
  mergeApplicationConfig,
  provideZonelessChangeDetection,
  signal,
  computed,
} from '@angular/core'; // @browser
import { Component } from '@angular/core'; // @browser
import { VERSION, OnInit } from '@angular/core'; // @browser
import { toSignal } from '@angular/core/rxjs-interop'; // @browser
import { MatButtonModule } from '@angular/material/button'; // @browser
import { MatCardModule } from '@angular/material/card'; // @browser
import { MatDividerModule } from '@angular/material/divider'; // @browser
import { MatIconModule } from '@angular/material/icon'; // @browser
import { MatListModule } from '@angular/material/list'; // @browser
import { MatMenuModule } from '@angular/material/menu'; // @browser
import { MatTabsModule } from '@angular/material/tabs'; // @browser
import { MatToolbarModule } from '@angular/material/toolbar'; // @browser
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRouter,
  Router,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  ActivatedRoute,
  Routes,
  Route,
  withHashLocation,
  withComponentInputBinding,
  NavigationEnd,
} from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { RenderMode, ServerRoute } from '@angular/ssr';
import {
  LayoutSimpleSmallAppModule,
  Topic,
  TopicService,
} from '@darekf77/application-quiz/src'; // @browser
import {
  MIGRATIONS_CLASSES_FOR_ApplicationQuizContext,
  SharedContext,
} from '@darekf77/application-quiz/src';
import Aura from '@primeng/themes/aura'; // @browser
import { providePrimeNG } from 'primeng/config'; // @browser
import {
  BehaviorSubject,
  Observable,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import {
  Taon,
  TaonBaseContext,
  TAON_CONTEXT,
  EndpointContext,
  TaonBaseAngularService,
  TaonEntity,
  StringColumn,
  TaonBaseAbstractEntity,
  TaonBaseCrudController,
  TaonController,
  GET,
  TaonMigration,
  TaonBaseMigration,
  TaonContext,
} from 'taon/src';
import { Utils, UtilsOs } from 'tnp-core/src';

import { HOST_CONFIG } from './app.hosts';
import { ENV_ANGULAR_NODE_APP_BUILD_PWA_DISABLE_SERVICE_WORKER } from './lib/env/env.angular-node-app';

//#endregion

//#region constants
const firstHostConfig = (Object.values(HOST_CONFIG) || [])[0];
console.log('Your backend host ' + firstHostConfig?.host);
console.log('Your frontend host ' + firstHostConfig?.frontendHost);
//#endregion

//#region application-quiz component

//#region @browser
@Component({
  selector: 'app-root',

  imports: [
    // RouterOutlet,
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatToolbarModule,
    MatTabsModule,
    RouterModule,
    JsonPipe,
    CommonModule,
    LayoutSimpleSmallAppModule,
  ],
  providers: [TopicService],
  templateUrl: './app.html',
})
export class ApplicationQuizApp implements OnInit {
  itemsLoaded = signal(false);

  topicService = inject(TopicService);

  activatedRoute = inject(ActivatedRoute);

  router = inject(Router);

  private url$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(() => this.router.url),
    startWith(this.router.url),
  );

  private url = toSignal(this.url$, { initialValue: this.router.url });

  showQuizSelect = computed(() => {
    const cleanUrl = this.url().split('?')[0];
    return cleanUrl === '/quiz';
  });

  readonly topics$: Observable<Topic[]> = this.topicService.topicController
    .getAll()
    .request()
    .observable.pipe(map(d => {
      console.log(d.body.json);
      return d.body.json;
    }));

  navItems =
    ApplicationQuizClientRoutes.length <= 1
      ? []
      : ApplicationQuizClientRoutes.filter(r => r.path !== undefined).map(
          r => ({
            path: r.path === '' ? '/' : `/${r.path}`,
            label: r.path === '' ? 'Home' : `${r.path}`,
          }),
        );

  get activePath(): string {
    return globalThis?.location.pathname?.split('?')[0];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(globalThis?.location.pathname);
    // TODO set below from 1000 to zero in production
    Taon.removeLoader(1000).then(() => {
      this.itemsLoaded.set(true);
    });
  }

  taonMode = UtilsOs.isRunningInWebSQL() ? 'websql' : 'normal nodejs';

  angularVersion = VERSION.full;

  forceShowBaseRootApp = false;

  navigateTo(item: { path: string; label: string }): void {
    if (item.path === '/') {
      if (this.forceShowBaseRootApp) {
        return;
      }
      this.forceShowBaseRootApp = true;
      return;
    }
    this.forceShowBaseRootApp = false;
    this.router.navigateByUrl(item.path);
  }
}
//#endregion

//#endregion

//#region  application-quiz routes
//#region @browser
export const ApplicationQuizServerRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
export const ApplicationQuizClientRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => {
      if (ApplicationQuizClientRoutes.length === 1) {
        return '';
      }
      return ApplicationQuizClientRoutes.find(r => r.path !== '')!.path!;
    },
  },
  // PUT ALL ROUTES HERE
  // @placeholder-for-routes
  // @app-ts-generated
  {
    path: 'stats',
    loadChildren: () =>
      import('./app/stats/stats.routes').then(m => m.StatsRoutes),
  },
  // @app-ts-generated
  {
    path: 'quiz',
    loadChildren: () =>
      import('./app/quiz/quiz.routes').then(m => m.QuizRoutes),
  },
];
//#endregion
//#endregion

//#region  application-quiz app configs
//#region @browser
export const ApplicationQuizAppConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    {
      provide: TAON_CONTEXT,
      useFactory: () => ApplicationQuizContext,
    },
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => ApplicationQuizStartFunction,
    },
    provideBrowserGlobalErrorListeners(),
    // remove withHashLocation() to use SSR
    provideRouter(
      ApplicationQuizClientRoutes,
      withHashLocation(),
      withComponentInputBinding(),
    ),
    provideClientHydration(withEventReplay()),
    provideServiceWorker('ngsw-worker.js', {
      enabled:
        !isDevMode() && !ENV_ANGULAR_NODE_APP_BUILD_PWA_DISABLE_SERVICE_WORKER,
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

export const ApplicationQuizServerConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(ApplicationQuizServerRoutes))],
};

export const ApplicationQuizConfig = mergeApplicationConfig(
  ApplicationQuizAppConfig,
  ApplicationQuizServerConfig,
);
//#endregion
//#endregion

//#region  application-quiz context
export var ApplicationQuizContext = Taon.createContext(() => ({
  ...HOST_CONFIG['ApplicationQuizContext'],
  contexts: {
    TaonBaseContext,
    SharedContext,
  },

  migrations: {
    ...MIGRATIONS_CLASSES_FOR_ApplicationQuizContext,
  },

  controllers: {
    // UserController,
  },
  entities: {
    // User,
  },
  database: true,
  disabledRealtime: true,
}));
//#endregion

//#region  application-quiz start function
export const ApplicationQuizStartFunction = async (
  startParams?: Taon.StartParams,
): Promise<void> => {
  await ApplicationQuizContext.initialize();

  //#region initialize auto generated active contexts
  const autoGeneratedActiveContextsForApp: TaonContext[] = [];

  const priorityContexts = [
    // put here manual priority for contexts if needed
  ];

  const activeContextsForApp: TaonContext[] = [
    ...priorityContexts,
    ...autoGeneratedActiveContextsForApp.filter(
      c => !priorityContexts.includes(c),
    ),
  ];

  for (const activeContext of activeContextsForApp) {
    await activeContext.initialize();
  }
  //#endregion

  //#region @backend
  if (
    startParams?.onlyMigrationRun ||
    startParams?.onlyMigrationRevertToTimestamp
  ) {
    process.exit(0);
  }
  //#endregion

  //#region @backend
  console.log(`Hello in NodeJs backend! os=${os.platform()}`);
  //#endregion
};
//#endregion

//#region default export
export default ApplicationQuizStartFunction;
//#endregion

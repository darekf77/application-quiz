import {
  Taon,
  TaonBaseContext,
  TaonController,
  TaonBaseController,
  GET,
} from 'taon/src';

//#region  application-quiz controller
@TaonController({ className: 'ApiController' })
class ApiController extends TaonBaseController {
  @GET()
  helloWorld(): Taon.Response<string> {
    //#region @websqlFunc
    return async (req, res) => 'hello world from taon controller';
    //#endregion
  }
}
//#endregion

//#region  application-quiz context
export const AppContext = Taon.createContext(() => ({
  contextName: 'app-context',
  contexts: { TaonBaseContext },
  host: 'http://localhost:8788',
  controllers: {
    ApiController,
  },
  database: false,
  disabledRealtime: true,
  logs: true,
}));
//#endregion

//#region cjsRemove
import { createFakeExpressApp } from 'taon/src';
import { AppContext } from './app.contex';

const app = createFakeExpressApp();

// middleware
app.use(async (req, res, next) => {
  console.log('Incoming:', req.method, req.url);
  await next?.();
});

// params
app.get('/hello', async (req, res) => {
  res.json({
    message: 'Hello from Worker!',
    query: req.query,
  });
});

app.get('/users/:id', async (req, res) => {
  res.json({
    userId: req.params.id,
  });
});

// login
app.post('/login', async (req, res) => {
  const { username } = req.body;

  res.cookie('sessionId', 'abc123', {
    httpOnly: true,
    path: '/',
  });

  res.json({ ok: true, user: username });
});

// auth
app.get('/me', async (req, res) => {
  if (!req.cookies.sessionId) {
    return res.sendStatus(401);
  }

  res.json({ user: 'demo-user' });
});

// redirect
app.get('/go', async (req, res) => {
  res.redirect('/hello');
});

// logout
app.get('/logout', async (req, res) => {
  res.clearCookie('sessionId');
  res.json({ ok: true });
});

await AppContext.initialize()
// AppContext.initialize().then(intiedApp => {
//   // intiedApp.serverTcpUdp
//   console.log('NIGGER');
//   console.log({ intiedApp });
//   app.get('/inited', async (req, res) => {
//     res.json({ user: 'app inited' });
//   });
// });

export { app };
//#endregion

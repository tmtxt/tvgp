import fetch from 'isomorphic-fetch';
import router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import settings from 'server/initializers/settings';

const apiServerUrl = `http://${settings.apiServer.host}:${settings.apiServer.port}`;


const handleLogin = async (ctx) => {
  const {
    username,
    password
  } = ctx.request.body;
  const apiLogin = `${apiServerUrl}/api/login`;

  // send request to api server to login
  const response = await fetch(
    apiLogin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    });

  // check response
  if (response.status !== 200) {
    ctx.throw(response.statusText, 403);
  }

  // set to cookies
  ctx.cookies.set('username', username, {
    httpOnly: false
  });
  ctx.cookies.set('password', password, {
    httpOnly: false
  });

  ctx.body = await response.json();
};


export default (app) => {
  const newRouter = router();
  newRouter.use(bodyParser());

  newRouter.post('/api/login', handleLogin);

  app
    .use(newRouter.routes())
    .use(newRouter.allowedMethods());
};

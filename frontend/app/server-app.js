import Koa from 'koa';
import debug from 'debug';
import {
  loggingLayer,
  apiLayer,
  securityLayer,
  assetsLayer,
  renderLayer,
  errorLayer,
} from 'server/middlewares';
import authentication from 'server/authentication';
import controllers from 'server/controllers/base';

const app = new Koa();

// setup middlewares
loggingLayer(app);
authentication(app);
apiLayer(app);
assetsLayer(app);
securityLayer(app);
renderLayer(app, controllers);
errorLayer(app);

// istanbul ignore next
app.on('error', (error) => {
  debug('error')(error);
});

export default app;

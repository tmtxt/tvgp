import React from 'react';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { selectors } from './client/components/routing/logic-bundle';

import StaticPage from './client/components/static-page';
import PageIndex from './client/components/page-index';
import PageLogin from './client/components/page-login';

export const getClientHistory = (store) =>
  syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectors.selectLocationState
  });

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(createMemoryHistory(url), store, {
    selectLocationState: selectors.selectLocationState
  });

export const getRoutes = (history) => (
  <Router history={history}>
    <Route path="/" component={PageIndex} />
    <Route path="/static-page" component={StaticPage} />

    <Route path="/login" component={PageLogin} />
  </Router>
);

import React from 'react';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { selectors } from './client/components/routing/logic-bundle';

import StaticPage from './client/components/static-page';
import HomePage from './client/components/home-page';

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
    <Route path="/" component={HomePage} />
    <Route path="/static-page" component={StaticPage} />
  </Router>
);

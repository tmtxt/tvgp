import React from 'react';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { selectors } from './client/components/routing/logic-bundle';
import { getRoute } from './client/helpers/routing';

import PageIndex from './client/components/page-index';
import PageLogin from './client/components/page-login';
import PageAdminIndex from './client/components/page-admin-index';


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
    <Route path={getRoute('Home')} component={PageIndex} />

    <Route path={getRoute('User.login')} component={PageLogin} />

    <Route path={getRoute('Admin.index')} component={PageAdminIndex} />
  </Router>
);

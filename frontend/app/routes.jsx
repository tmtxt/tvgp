import React from 'react';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { selectors } from './client/components/routing/logic-bundle';
import { getRoute } from './client/helpers/routing';

import PageIndex from './client/components/page-index';
import PageLogin from './client/components/page-login';
import PageTree from './client/components/page-tree';

import PageAdminIndex from './client/components/page-admin-index';
import PageChangePassword from './client/components/page-change-password';
import PageAdminPreface from './client/components/page-admin-preface';


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
    <Route path={getRoute('Tree')} component={PageTree} />

    <Route path={getRoute('Admin.index')} component={PageAdminIndex} />
    <Route path={getRoute('Admin.changePassword')} component={PageChangePassword} />
    <Route path={getRoute('Admin.preface')} component={PageAdminPreface} />
  </Router>
);

import React from 'react';
import { browserHistory, createMemoryHistory, Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { selectors } from 'client/components/routing/logic-bundle';
import RoutePaths from 'client/constants/routes';

import PageIndex from './client/components/page-index';
import PageLogin from './client/components/page-login';
import PageTree from './client/components/page-tree';

import PageAdminIndex from './client/components/page-admin-index';
import PageChangePassword from './client/components/page-change-password';
import PageAdminPreface from './client/components/page-admin-preface';

import PagePersonDetail from './client/components/page-person-detail';

export const getClientHistory = store =>
  syncHistoryWithStore(browserHistory, store, {
    selectLocationState: selectors.selectLocationState
  });

export const getServerHistory = (store, url) =>
  syncHistoryWithStore(createMemoryHistory(url), store, {
    selectLocationState: selectors.selectLocationState
  });

export const getRoutes = history => (
  <Router history={history}>
    <Route path={RoutePaths.Home} component={PageIndex} />
    <Route path={RoutePaths.User.login} component={PageLogin} />
    <Route path={RoutePaths.Tree} component={PageTree} />

    <Route path={RoutePaths.Admin.index} component={PageAdminIndex} />
    <Route path={RoutePaths.Admin.changePassword} component={PageChangePassword} />
    <Route path={RoutePaths.Admin.preface} component={PageAdminPreface} />

    <Route path={RoutePaths.Person.detail} component={PagePersonDetail} />
  </Router>
);

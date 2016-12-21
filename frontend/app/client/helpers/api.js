import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import UrlPattern from 'url-pattern';
import changeCaseObject from 'change-case-object';

import getUrl from 'client/helpers/get-url';
import apiRoutes from 'client/constants/api';
import {
  selectors
} from 'client/components/user/logic-bundle';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


function parseJSON(response) {
  return response.json().then(res => res, () => null);
}


function getQueryString(query) {
  const esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => `${esc(k)}=${esc(query[k])}`)
    .join('&');
}

function getHeaders(getState) {
  const headers = {
    'Content-Type': 'application/json'
  };

  if (getState) {
    const state = getState();
    const user = selectors.getUser(state);
    const isAuthenticated = user.get('isAuthenticated');

    if (isAuthenticated) {
      const authToken = user.get('authToken');
      headers['tvgp-auth-token'] = authToken;
    }
  }

  return headers;
}


function api(routeName, params, query, body, getState) {
  params = changeCaseObject.snakeCase(params || {});
  query = changeCaseObject.snakeCase(query || {});
  body = changeCaseObject.snakeCase(body || {});

  const routeConfig = apiRoutes[routeName];
  const method = _.upperCase(routeConfig.method);

  // build url
  const pattern = new UrlPattern(routeConfig.url);
  let url = pattern.stringify(params);

  // query string
  const queryString = getQueryString(query);
  if (!_.isEmpty(queryString)) {
    url = `${url}?${queryString}`;
  }
  url = getUrl(url);

  // headers
  const headers = getHeaders(getState);

  return fetch(
      url, {
        method,
        body: JSON.stringify(body),
        headers
      })
    .then(checkStatus)
    .then(parseJSON)
    .then(changeCaseObject.camelCase);
}

export default api;

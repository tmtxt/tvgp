import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import UrlPattern from 'url-pattern';

import getUrl from 'client/helpers/get-url';

import apiRoutes from 'client/constants/api';


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}


function parseJSON(response) {
  return response.json();
}


function getQueryString(query) {
  const esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => `${esc(k)}=${esc(query[k])}`)
    .join('&');
}


function api(routeName, params, query, body) {
  params = params || {};
  query = query || {};

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

  //
  url = getUrl(url);

  return fetch(
      url, {
        method,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(checkStatus)
    .then(parseJSON);
}

export default api;

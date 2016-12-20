import _ from 'lodash';
import UrlPattern from 'url-pattern';
import { browserHistory } from 'react-router';

import routes from 'client/constants/routes';


function getQueryString(query) {
  const esc = encodeURIComponent;
  return Object.keys(query)
    .map(k => `${esc(k)}=${esc(query[k])}`)
    .join('&');
}


export function push(routeSelector, params = {}, query = {}) {
  let route = _.get(routes, routeSelector);

  if (!route) {
    return;
  }

  // route and params
  const pattern = new UrlPattern(route);
  route = pattern.stringify(params);

  // query string
  const queryString = getQueryString(query);
  if (!_.isEmpty(queryString)) {
    route = `${route}?${queryString}`;
  }

  browserHistory.push(route);
}

export default push;
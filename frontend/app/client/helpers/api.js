import _ from 'lodash';
import request from 'superagent';

import apiRoutes from './apis.json';


function api(routeName, params, query, body, {
  done = _.noop,
  fail = _.noop
}) {

}

export default api;

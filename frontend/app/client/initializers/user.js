import _ from 'lodash';
import {
  login
} from 'client/components/user/logic-bundle';

export default function initUser(store) {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (!_.isEmpty(username) && !_.isEmpty(password)) {
    store.dispatch(login(username, password));
  }
}

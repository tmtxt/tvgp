import {
  setUser
} from 'client/components/user/logic-bundle';

export default function initUser(store) {
  store.dispatch(setUser('aaa'));
}

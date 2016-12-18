import identity from 'lodash/identity';
import globalizeSelectors from 'client/helpers/globalize-selectors';


const mountPoint = 'user';
const selectors = globalizeSelectors({
  getUser: identity
}, mountPoint);


export default function initUser(store) {

}

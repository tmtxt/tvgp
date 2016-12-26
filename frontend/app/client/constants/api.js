export default {
  'Auth.login': {
    method: 'post',
    url: '/api/login'
  },

  'Auth.logout': {
    method: 'post',
    url: '/api/logout'
  },

  'Auth.changePassword': {
    method: 'post',
    url: '/api/change-password'
  },

  'MinorContent.getPreface': {
    method: 'get',
    url: '/api/minor-contents/preface'
  }
};

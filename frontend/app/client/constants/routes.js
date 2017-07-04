export default {
  Home: '/',
  Tree: '/tree',

  User: {
    login: '/login'
  },

  Admin: {
    index: '/admin',
    changePassword: '/admin/change-password',
    preface: '/admin/preface'
  },

  Person: {
    add: '/persons/:personId/add/:role',
    detail: '/persons/:personId'
  }
};

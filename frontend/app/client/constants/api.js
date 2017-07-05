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
  },
  'MinorContent.updatePreface': {
    method: 'post',
    url: '/api/minor-contents/preface'
  },

  'Tree.getTreeFromDefaultRoot': {
    method: 'get',
    url: '/api/trees'
  },
  'Tree.getTreeFromPerson': {
    method: 'get',
    url: '/api/trees/:personId'
  },

  'Person.getPersonById': {
    method: 'get',
    url: '/api/persons/:personId'
  },

  'PedigreeRelation.getParentsByPersonId': {
    method: 'get',
    url: '/api/persons/:personId/parents'
  },
  'PedigreeRelation.getChildrenByPersonId': {
    method: 'get',
    url: '/api/persons/:personId/children'
  },

  'MarriageRelation.getMarriagesByPersonId': {
    method: 'get',
    url: '/api/persons/:personId/marriages'
  }
};

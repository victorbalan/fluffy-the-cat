var Behaviors = Behaviors || {};
Behaviors.Providers = Behaviors.Providers || {};

Behaviors.Providers.General = {
  properties: {
    baseUrl: {
      type: String
    },
    data: {
      type: Object,
      reflectToAttribute: true,
      notify: true
    }
  },
  ready: function(){
    var prefix = 'https://fluffy-the-cat-api.herokuapp.com';

    if (location.origin.indexOf('localhost') !== -1) {
      prefix = 'http://localhost:5000';
    }

    this.headers = {'Authorization': 'Bearer ' + localStorage.token};
    this.baseUrl = prefix;
  },
  refreshToken: function(){
    this.headers = {'Authorization': 'Bearer ' + localStorage.token};
  }
};

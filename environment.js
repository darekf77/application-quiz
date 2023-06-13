
const path = require('path')
var { config } = { config: {} };

config = {
  loading: {
    preAngularBootstrap: {
      loader: './logo.png',
      background: '#ececec',
    },
    afterAngularBootstrap: {
      loader: {
        name: 'lds-grid',
        color: '#c85958'
      },
      background: '##c6c6c6',
    },
  },
  domain: 'application-quiz.example.domain.com',
  useDomain: false,
  title: 'Application Quiz',
  pwa: {
    // start_url: ''
  }

}
module.exports = exports = { config };

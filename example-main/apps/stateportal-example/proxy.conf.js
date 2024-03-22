const PROXY_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:3333',
    secure: false
  },

  {
    context: ['/ruuter/api'],
    pathRewrite: {
      '^/ruuter/api': ''
    },
    target: 'https://ruuter.arendus.eesti.ee',
    changeOrigin: true,
    secure: false
  },

  {
    context: ['/orbeon-xroad'],
    target: 'https://www.arendus.eesti.ee',
    changeOrigin: true,
    secure: false
  },
  {
    context: ['/orbeon'],
    target: 'http://localhost:8085',
    pathRewrite: {
      '^/orbeon': '/orbeon'
    },
    headers: {
      'X-Frame-Options': 'SAMEORIGIN'
    },
    changeOrigin: true,
    secure: false
  },
  {
   context: ['/postkast/mail'],
   target: 'https://www.arendus.eesti.ee',
   changeOrigin: true,
   secure: false
  },
  {
    context: ['/assets'],
    target: 'https://www.arendus.eesti.ee',
    changeOrigin: true,
    secure: false
  }
];

module.exports = PROXY_CONFIG;

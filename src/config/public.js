module.exports =  [
  {
      method: 'GET',
      path: '/',
      handler: function (request, reply) {
          reply.file('./public/index.html');
      },
      config: {
        state: {
            parse: true, // parse and store in request.state
            failAction: 'error' // may also be 'ignore' or 'log'
        }
    }
  },
  {
      method: 'GET',
      path: '/js/{params*}',
      handler: {
          directory: {
              path: './public/js',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/css/{params*}',
      handler: {
          directory: {
              path: './public/css',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/fancybox/{params*}',
      handler: {
          directory: {
              path: './public/fancybox',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/fonts/{params*}',
      handler: {
          directory: {
              path: './public/fonts',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/images/{params*}',
      handler: {
          directory: {
              path: './public/images',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/js/config/{params*}',
      handler: {
          directory: {
              path: './public/js/config',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/js/dependencies/{params*}',
      handler: {
          directory: {
              path: './public/js/dependencies',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/js/util/{params*}',
      handler: {
          directory: {
              path: './public/js/util',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/less/{params*}',
      handler: {
          directory: {
              path: './public/less',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/scss/{params*}',
      handler: {
          directory: {
              path: './public/scss',
              listing: false
          }
      }
  },
  {
      method: 'GET',
      path: '/html/{params*}',
      handler: {
          directory: {
              path: './public/html',
              listing: false
          }
      }
  },

];

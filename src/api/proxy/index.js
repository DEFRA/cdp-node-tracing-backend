import { proxyController } from '~/src/api/proxy/proxy.js'

export const proxyRoutes = {
  plugin: {
    name: 'proxyroutes',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/proxy',
          ...proxyController
        }
      ])
    }
  }
}

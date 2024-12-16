import { proxyController } from '~/src/api/proxy/proxy.js'
import { notifyController } from '~/src/api/proxy/notify.js'

export const proxyRoutes = {
  plugin: {
    name: 'proxyroutes',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/proxy',
          ...proxyController
        },
        {
          method: 'GET',
          path: '/notify',
          ...notifyController
        }
      ])
    }
  }
}

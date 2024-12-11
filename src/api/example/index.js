import {
  trace,
  traceEnd
} from '~/src/api/example/controllers/example-find-all.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
const example = {
  plugin: {
    name: 'example',
    register: (server) => {
      server.route([
        {
          method: 'GET',
          path: '/trace',
          ...trace
        },
        {
          method: 'GET',
          path: '/trace/end',
          ...traceEnd
        }
      ])
    }
  }
}

export { example }

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

import Wreck from '@hapi/wreck'
import { request } from 'undici'
import { provideProxy } from '~/src/api/common/helpers/proxy.js'

export const proxyController = {
  handler: async (_request, h) => {
    const urls = ['http://example.com', 'https://example.com']

    const results = {
      nodefetch: {},
      wreck: {},
      undici: {}
    }

    for (const url of urls) {
      try {
        const { proxyAgent } = provideProxy()
        const result = await fetch(url, { dispatcher: proxyAgent })
        results.nodefetch[url] = result.status
      } catch (e) {
        results.nodefetch[url] = e.toString()
      }
    }

    for (const url of urls) {
      try {
        const { payload } = await Wreck.get(url)
        results.wreck[url] = payload.toString()
      } catch (e) {
        results.wreck[url] = e
      }
    }

    for (const url of urls) {
      try {
        const { statusCode } = await request(url)
        results.undici[url] = statusCode
      } catch (e) {
        results.undici[url] = e
      }
    }

    return h.response({ message: 'success', results }).code(200)
  }
}

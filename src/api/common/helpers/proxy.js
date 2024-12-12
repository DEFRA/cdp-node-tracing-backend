import { URL } from 'node:url'
import { ProxyAgent, setGlobalDispatcher } from 'undici'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { createLogger } from '~/src/api/common/helpers/logging/logger.js'
import { bootstrap } from 'global-agent'

const logger = createLogger()
/**
 * @typedef Proxy
 * @property {URL} url
 * @property {number} port
 * @property {ProxyAgent} proxyAgent
 * @property {HttpsProxyAgent<string>} httpAndHttpsProxyAgent
 */

/**
 * Provide ProxyAgent and HttpsProxyAgent when http/s proxy url config has been set
 * @returns {Proxy|null}
 */
function provideProxy() {
  const proxyUrl = process.env.HTTP_PROXY

  if (!proxyUrl) {
    return null
  }

  const url = new URL(proxyUrl)
  const port = url.port ?? 80

  logger.debug(`Proxy set up using ${url.origin}:${port}`)

  return {
    url,
    port,
    proxyAgent: new ProxyAgent({
      uri: proxyUrl,
      keepAliveTimeout: 10,
      keepAliveMaxTimeout: 10
    }),
    httpAndHttpsProxyAgent: new HttpsProxyAgent(url)
  }
}

const proxy = {
  plugin: {
    name: 'proxy',
    version: '1.0.0',
    register: function (server) {
      if (process.env.HTTP_PROXY) {
        server.logger.info('setting up proxy')
        const uri = process.env.HTTP_PROXY
        // setup unidici global proxy
        setGlobalDispatcher(new ProxyAgent({ uri }))

        // setup global-proxy-agent
        bootstrap()
        global.GLOBAL_AGENT.HTTP_PROXY = uri

        // setup and other non-standard http clients
      } else {
        server.logger.info('No proxy configured')
      }
    }
  },
  options: {}
}

export { provideProxy, proxy }

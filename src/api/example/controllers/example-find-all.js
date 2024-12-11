import { statusCodes } from '~/src/api/common/constants/status-codes.js'
import { getTraceId, withTraceId } from '@defra/hapi-tracing'
import { config } from '~/src/config/index.js'

/**
 * Example controller
 * Finds all entries in a mongodb collection
 * @satisfies {Partial<ServerRoute>}
 */
const trace = {
  handler: async (request, h) => {
    const url = config.get('dotnetBackend')
    const res = await fetch(`${url}/trace/end`, {
      method: 'GET',
      headers: withTraceId('x-cdp-request-id')
    })
    request.logger.info(`Response from trace request ${res.status}`)
    const text = res.text()
    return h.response({ message: 'success', text }).code(statusCodes.ok)
  }
}

const traceEnd = {
  handler: (request, h) => {
    request.logger.info(`handling request with trace id of ${getTraceId()}`)
    return h.response({ message: 'success' }).code(statusCodes.ok)
  }
}

export { trace, traceEnd }

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */

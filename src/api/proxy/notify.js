import { NotifyClient } from 'notifications-node-client'

export const notifyController = {
  handler: async (request, h) => {
    try {
      const client = new NotifyClient('invalid-value')
      await client.getAllTemplates('email')
    } catch (e) {
      request.logger.info(`notify returned a ${e?.status}`)
      request.logger.error(e)
    }
    return h.response({ message: 'success' }).code(200)
  }
}

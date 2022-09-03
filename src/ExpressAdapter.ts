import express from 'express'

import Http from './Http'

export default class ExpressAdapter implements Http {
  app: ReturnType<typeof express>

  constructor() {
    this.app = express()
  }

  on(
    method: 'post' | 'get' | 'put' | 'patch' | 'delete',
    url: string,
    callback: (params: { [x: string]: string }, body: { [x: string]: unknown }) => unknown
  ): void {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body)
      return res.json(output)
    })
  }

  listen(port: number): void {
    this.app.listen(port)
  }
}

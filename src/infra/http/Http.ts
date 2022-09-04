type AnyObject = Record<string, unknown>
type Params = Record<string, string>
type Method = 'get' | 'post' | 'put' | 'patch' | 'delete'

type Callback = (params: Params, body: AnyObject) => unknown

export default interface Http {
  on(method: Method, url: string, callback: Callback): void
  listen(port: number): void
}

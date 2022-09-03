type Callback = (chunk: Buffer) => void

export default interface InputDevice {
  onData (callback: Callback): void
}

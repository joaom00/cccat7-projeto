import InputDevice from "./InputDevice";

export default class StdinAdapter implements InputDevice {
  onData(callback: (chunk: Buffer) => void): void {
      process.stdin.on('data', callback)
  }
}

export default interface OutputDevice {
  write(text: string | Uint8Array): void
}

import InputDevice from './InputDevice'
import OutputDevice from './OutputDevice'

type Output = string | Uint8Array | void
type CommandName = string
type CommandCallback = (params: string) => Output | Promise<Output>

export default class CLIManager {
  commands: Record<CommandName, CommandCallback>

  constructor(inputDevice: InputDevice, readonly outputDevice: OutputDevice) {
    this.commands = {}
    inputDevice.onData(async chunk => {
      const command = chunk.toString()
      await this.type(command)
    })
  }

  addCommand(command: string, callback: CommandCallback) {
    this.commands[command] = callback
  }

  async execute(command: string) {
    const [name] = command.split(' ')
    const params = command.replace(name + ' ', '')
    const output = await this.commands[name.trim()](params)
    return output
  }

  async type(text: string) {
    const output = await this.execute(text)
    if (output) this.outputDevice.write(output)
  }
}

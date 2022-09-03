import InputDevice from "./InputDevice"

type Output = string | Uint8Array | void
type CommandName = string
type CommandCallback = (params: string) => Output | Promise<Output>

export default class CLIManager {
  commands: Record<CommandName, CommandCallback>

  constructor(inputDevice: InputDevice) {
    this.commands = {}
    inputDevice.onData(async chunk => {

      const command = chunk.toString()
      await this.execute(command)
    })
  }

  addCommand(command: string, callback: CommandCallback) {
    this.commands[command] = callback
  }

  async execute(command: string) {
    const [name] = command.split(' ')
    const params = command.replace(name + ' ', '')
    const output = await this.commands[name.trim()](params)
    if (output) {
      process.stdout.write(output)
    }
  }
}

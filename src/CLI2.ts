import CLIController from './CLIController'
import CLIManager from './CLIManager'
import StdinAdapter from './StdinAdapter'

const inputDevice = new StdinAdapter()
// const outputDevice = new StdoutAdapter()
const cliManager = new CLIManager(inputDevice)
new CLIController(cliManager)

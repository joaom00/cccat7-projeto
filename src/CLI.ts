import CLIManager from './infra/cli/CLIManager'
import StdinAdapter from './infra/cli/StdinAdapter'
import StdoutAdapter from './infra/cli/StdoutAdapter'
import CLIController from './infra/controller/cli/CLIController'
import PgPromiseAdapter from './infra/database/PgPromiseAdapter'

const inputDevice = new StdinAdapter()
const outputDevice = new StdoutAdapter()
const connection = new PgPromiseAdapter()
const cliManager = new CLIManager(inputDevice, outputDevice)
new CLIController(cliManager, connection)

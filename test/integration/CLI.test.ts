import CLIManager from '@/infra/cli/CLIManager'
import CLIController from '@/infra/controller/cli/CLIController'
import PgPromiseAdapter from '@/infra/database/PgPromiseAdapter'

it('Deve testar o CLI', async () => {
  const inputDevice = {
    onData: () => {
      return
    }
  }
  const outputDevice = {
    write: () => {
      return
    }
  }
  const connection = new PgPromiseAdapter()
  const cliManager = new CLIManager(inputDevice, outputDevice)
  new CLIController(cliManager, connection)
  await cliManager.execute('cpf 886.634.854-68')
  await cliManager.execute('add-item 1 1')
  const output = await cliManager.execute('preview')
  expect(output).toBe('total: 1030')
  await connection.close()
})

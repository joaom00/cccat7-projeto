import CLIController from '@/CLIController'
import CLIManager from '@/CLIManager'

it('Deve testar o CLI', async () => {
  const inputDevice = { onData: () => {} }
  const cliManager = new CLIManager(inputDevice)
  new CLIController(cliManager)
  await cliManager.execute('cpf 886.634.854-68')
  await cliManager.execute('add-item 1 1')
  await cliManager.execute('preview')
})

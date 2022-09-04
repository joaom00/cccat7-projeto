import Cpf from "@/domain/entities/Cpf"

const validCPFs = ['886.634.854-68', '47308766870']

test.each(validCPFs)('Deve validar um CPF válido', (value: string) => {
  const cpf = new Cpf(value)
  expect(cpf).toBeDefined()
  expect(cpf.getValue()).toBe(value)
})

const CPFsWithSameDigits = ['111.111.111-11', '222.222.222-22', '333.333.333-33']

test.each(CPFsWithSameDigits)(
  'Deve validar um CPF inválido com todos os dígitos iguais',
  (cpf: string) => {
    expect(() => new Cpf(cpf)).toThrow(new Error('Cpf Inválido'))
  }
)

test('Deve validar um CPF inválido com o tamanho maior', function () {
  expect(() => new Cpf('111.111.111-1111')).toThrow(new Error('Cpf Inválido'))
})

test('Deve validar um CPF inválido com o tamanho menor', function () {
  expect(() => new Cpf('111.111.111')).toThrow(new Error('Cpf Inválido'))
})

test('Deve validar um CPF vazio', function () {
  expect(() => new Cpf('')).toThrow(new Error('Cpf Inválido'))
})

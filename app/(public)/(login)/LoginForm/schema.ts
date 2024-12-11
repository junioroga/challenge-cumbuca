import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

const schema = yup
  .object({
    document: yup
      .string()
      .required('CPF é obrigatório')
      .min(11, 'O CPF precisa de 11 caracteres')
      .transform((_value, originalValue) => originalValue.replace(/[^0-9]/g, ''))
      .test('test-invalid-cpf', 'CPF informado é inválido', (cpf) => isValidCPF(cpf)),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    lastAccess: yup.date().required('Data é obrigatória'),
  })
  .required()

export default schema

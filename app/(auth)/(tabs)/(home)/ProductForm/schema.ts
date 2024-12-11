import { parseCurrency } from '@brazilian-utils/brazilian-utils'
import * as yup from 'yup'

const schema = yup
  .object({
    name: yup
      .string()
      .required('Nome do produto é obrigatório')
      .min(3, 'Nome do produto deve ter pelo menos 3 letras'),
    quantity: yup
      .number()
      .integer('Quantidade precisa ser um número inteiro')
      .positive('Quantidade deve ser maior que zero')
      .required('Quantidade é obrigatória')
      .typeError('Por favor, insira um número válido para quantidade'),
    unityValue: yup
      .number()
      .required('Valor unitário é obrigatório')
      .positive('Valor unitário deve ser maior que zero')
      .transform((_value, originalValue) => parseCurrency(String(originalValue))),
    totalValue: yup.number().when('quantity', {
      is: true,
      then: (field) => field,
    }),
  })
  .required()

export default schema

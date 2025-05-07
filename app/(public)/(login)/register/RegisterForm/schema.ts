import * as yup from 'yup'

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    name: yup
      .string()
      .min(3, 'O nome precisa de pelo menos 3 caracteres')
      .required('Nome é obrigatório'),
  })
  .required()

export default schema

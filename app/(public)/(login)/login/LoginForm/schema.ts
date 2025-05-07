import * as yup from 'yup'

const schema = yup
  .object({
    email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
    password: yup
      .string()
      .required('Senha é obrigatória')
      .min(8, 'A senha deve ter pelo menos 8 caracteres'),
  })
  .required()

export default schema

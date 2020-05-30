export default {
  jwt:{
    secret: process.env.APP_SECRET || 'default', // apenas para validar os testes
    expiresIn: '1d',
  }
}
interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string,
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'diego@rocketseat.com.br', // colocar email configurado no SES,
      name: 'Diego da Rocketseat'
    }
  }
} as IMailConfig

# Recuperação de senha

**RF** (requisitos funcionais)
- O usário deve poder recuperar sua senha informando seu email;
= O usuário deve receber um email com instruções de nova senha;
- O usuário deve poder resetar sua senha;

**RNF** (requisitos não funcionais) não ligados com a regra de negócio
- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de emails deve acontecer em segundo plano (background jobs);

**RN** (regras de negocio)
- o link enviado por email para resetar senha, deve expirar 2h;
- o usuário precisa confirmar a nova senha para resetar sua senha;


# Atualização do perfil
**RF** (requisitos funcionais)
- O usuário deve poder atualizar seu perfil: Nome, Email e Senha;

**RN** (regras de negocio)
- O usuário não pode alterar seu email para de outro usuário;
- Para atualizar sua senha, o usuário deve informar senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua senha

# Painel do prestador

**RF** (requisitos funcionais)
- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação, sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF** (requisitos não funcionais) não ligados com a regra de negócio
- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações devem ser enviadas em tempo real utilizando Socket.io;

**RN** (regras de negocio)
- A notificação deve ter um status de lida ou não-lida para controle do prestador;

# Agendamento de serviços
**RF** (requisitos funcionais)
- O usuário deve poder listar todos os prestadores cadastrados;
- O usuário deve poder visualizar os dias de um mês com horário disponivel de um prestador;
- O usuário deve poder listar os horaris de um dia especifico de um prestador;
- O usuário deve poder realizar um agendamento com um prestador;

**RNF** (requisitos não funcionais) não ligados com a regra de negócio
- A listagem de prestadores deve ser armazenada em cache;

**RN** (regras de negocio)
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devel estar disponivieis entre 8h às 18h (primeiro as 8, ultimo as 17);
- O usuário não pode agendar em um horário já agendado;
- O usuário não pode agendar em um horário que ja passou;
- O usuário não pode agendar consigo mesmo;







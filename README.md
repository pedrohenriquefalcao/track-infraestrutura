# Track Cloud

**Sistema de monitoramento e controle de custos de infraestrutura em nuvem**

Projeto desenvolvido em Angular para a disciplina de Cloud Computing e Frontend Frameworks, no 4º semestre.

## Sobre o projeto

O Track Cloud apresenta uma visão centralizada dos recursos de uma infraestrutura em nuvem. A aplicação permite cadastrar, consultar, editar e excluir recursos, além de acompanhar custos mensais, consumo de CPU e alertas operacionais.

Os dados são persistidos no `localStorage` do navegador, não sendo necessária a configuração de banco de dados ou API externa.

## Funcionalidades

- Listagem dos recursos monitorados
- Cadastro de novos recursos
- Edição e exclusão com confirmação
- Busca por nome, provedor ou tipo
- Filtro por ambiente
- Indicadores de custo, estado, CPU e alertas
- Persistência dos dados no navegador
- Interface responsiva

## Tecnologias

- Angular 22
- TypeScript
- HTML
- CSS
- Angular Forms
- localStorage
- Vitest

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm start
```

Depois, acesse `http://localhost:4200/`.

### Executar testes

```bash
npm test
```

### Gerar versão de produção

```bash
npm run build
```

Os arquivos compilados serão criados em `dist/monitoramento-infraestrutura/browser`.

## Estrutura principal

```text
src/app/
├── app.ts                       # Componente principal da interface
├── app.html                     # Template do painel
├── app.css                      # Estilos da aplicação
├── recurso-nuvem.model.ts       # Tipos e interface dos recursos
└── recurso-nuvem.service.ts     # CRUD e persistência no localStorage
```

## Convenções do código

- Variáveis e métodos escritos em português
- Nomes com intenção clara e autoexplicativa
- Componentes independentes por responsabilidade
- Dados iniciais carregados automaticamente na primeira utilização
- Interface em português brasileiro

## Possíveis evoluções

- Integração com API real de provedores de nuvem
- Gráficos históricos de consumo
- Autenticação de usuários
- Exportação de relatórios
- Cadastro de orçamentos por ambiente

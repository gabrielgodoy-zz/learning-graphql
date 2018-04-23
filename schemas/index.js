// importa helpers de tipagem do graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

// Tipos
const User = require('./types/User');

/*
  GraphQL type schema que mapeia com os dados do banco
  Todos os campos definidos no Root, estarão disponíveis
  para busca no primeiro nível de uma operação
*/
const RootQueryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    user: {
      args: {
        apiKey: {
          type: new GraphQLNonNull(GraphQLString), // GraphQLNonNull indica obrigatoriedade
        },
      },
      description: 'Recebe uma *chave de API* e entrega informações do usuário',
      type: User,
      resolve: (obj, args, { loaders }) => {
        // Lê informação do usuário no banco
        return loaders.usersByApiKeys.load(args.apiKey);
      },
    },
  },
});

const AddContestMutation = require('./mutations/addContest');
const AddNameMutation = require('./mutations/addName');

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    AddContest: AddContestMutation,
    AddName: AddNameMutation,
  }),
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = ncSchema;

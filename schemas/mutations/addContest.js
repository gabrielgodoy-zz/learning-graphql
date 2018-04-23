const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLInputObjectType,
} = require('graphql');

const pgdb = require('./../../database/postgres/pgdb');
const Contest = require('./../types/Contest');

const ContestInput = new GraphQLInputObjectType({
  name: 'ContestInput',
  fields: {
    apiKey: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
  },
});

module.exports = {
  type: Contest,
  // Input values to change data in db
  args: {
    input: {
      type: new GraphQLNonNull(ContestInput),
    },
  },
  /*
    1. Persiste conteúdo no banco de dados usando os argumentos de input
    2. Resolve com o novo conteúdo que foi persistido
  */
  resolve(obj, { input }, { pgPool }) {
    return pgdb(pgPool).addNewContest(input);
  },
};

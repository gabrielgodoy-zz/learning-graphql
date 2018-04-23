const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const ContestType = require('./Contest');
    const ActivityType = require('./Activity');

    return {
      id: {
        description: 'ID do usuário',
        type: GraphQLID,
      },
      email: {
        description: 'Email do usuário',
        type: new GraphQLNonNull(GraphQLString),
      },
      firstName: {
        description: 'Primeiro nome do usuário',
        type: GraphQLString,
      },
      lastName: {
        description: 'Último nome do usuário',
        type: GraphQLString,
      },
      fullName: {
        description: 'Nome completo',
        type: GraphQLString,
        resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
      },
      createdAt: {
        description: 'Quando usuário foi criado',
        type: GraphQLString,
      },
      contests: {
        type: new GraphQLList(ContestType),
        resolve(obj, args, { loaders }) {
          return loaders.contestsForUserIds.load(obj.id);
        },
      },
      contestsCount: {
        type: GraphQLInt,
        description: 'Quantidade de contests criados',
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mongodb.usersByIds
            .load(obj.id)
            .then(res => res[fieldName]);
        },
      },
      namesCount: {
        type: GraphQLInt,
        description: 'Quantidade de nomes criados',
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mongodb.usersByIds
            .load(obj.id)
            .then(res => res[fieldName]);
        },
      },
      votesCount: {
        type: GraphQLInt,
        description: 'Número de votos do usuário',
        resolve(obj, args, { loaders }, { fieldName }) {
          return loaders.mongodb.usersByIds
            .load(obj.id)
            .then(res => res[fieldName]);
        },
      },
      activities: {
        type: new GraphQLList(ActivityType),
        description: 'Pode ser uma atividade de criação de contests ou de Nomes criativos para contests',
        resolve(obj, args, { loaders }) {
          return loaders.activitiesForUserIds.load(obj.id);
        },
      },
    };
  },
});

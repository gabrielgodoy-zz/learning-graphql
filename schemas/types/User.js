const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} = require('graphql');

const Contest = require('./Contest');

module.exports = new GraphQLObjectType({
  name: 'User',
  fields: {
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
      description: 'Primeiro nome do usuário',
      type: GraphQLString,
    },
    fullName: {
      type: GraphQLString,
      resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
    createdAt: {
      description: 'Quando usuário foi criado',
      type: GraphQLString,
    },
    contests: {
      type: new GraphQLList(Contest),
      resolve(obj, args, context) {
        return context.loaders.contestsForUserIds.load(obj.id)
      },
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mongodb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
      },
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mongodb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
      },
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { loaders }, { fieldName }) {
        return loaders.mongodb.usersByIds.load(obj.id)
          .then(res => res[fieldName]);
      },
    },
  },
});

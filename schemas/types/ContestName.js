const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const ContestTotalVotes = require('./ContestTotalVotes');

module.exports = new GraphQLObjectType({
  name: 'ContestName',
  /*
  Ao tornar fields uma função, ela não via ser executada
  imediatamente quando User rodar,
  E por isso não vai causar o problema de "Cyclic Module Dependency"
  */
  fields: () => {
    const User = require('./User');
    return {
      id: {
        type: GraphQLID,
      },
      label: {
        type: GraphQLString,
      },
      description: {
        type: GraphQLString,
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
      },
      createdBy: {
        type: new GraphQLNonNull(User),
        resolve(obj, args, { loaders }) {
          return loaders.usersByIds.load(obj.createdBy);
        },
      },
      totalVotes: {
        type: ContestTotalVotes,
        resolve(obj, args, { loaders }) {
          return loaders.totalVotesByNameIds.load(obj.id)
        }
      }
    };
  },
});

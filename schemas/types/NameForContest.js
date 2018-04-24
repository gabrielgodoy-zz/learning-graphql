const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'NameForContest',
  /*
  Ao tornar fields uma função, ela não vai ser executada
  imediatamente quando User rodar,
  E por isso não vai causar o problema de "Cyclic Module Dependency"
  */
  fields: () => {
    const UserType = require('./User');
    const ContestTotalVotesType = require('./ContestTotalVotes');

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
        type: new GraphQLNonNull(UserType),
        resolve(parentObject, args, { loaders }) {
          return loaders.usersByIds.load(parentObject.createdBy);
        },
      },
      totalVotes: {
        type: ContestTotalVotesType,
        resolve(parentObject, args, { loaders }) {
          return loaders.totalVotesByNameIds.load(parentObject.id);
        },
      },
    };
  },
});

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'ContestTotalVotes',
  fields: () => {
    return {
      up: {
        type: GraphQLInt,
      },
      down: {
        type: GraphQLInt,
      },
    };
  },
});

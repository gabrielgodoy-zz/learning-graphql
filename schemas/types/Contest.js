const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'Contest',
  fields: () => {
    const NameForContestType = require('./../types/NameForContest');
    const ContestStatusType = require('./ContestStatus');

    return {
      id: {
        type: GraphQLID,
      },
      code: {
        type: new GraphQLNonNull(GraphQLString),
      },
      title: {
        type: new GraphQLNonNull(GraphQLString),
      },
      description: {
        type: GraphQLString,
      },
      status: {
        type: new GraphQLNonNull(ContestStatusType),
      },
      createdAt: {
        type: new GraphQLNonNull(GraphQLString),
      },
      names: {
        type: new GraphQLList(NameForContestType),
        resolve(obj, args, { loaders }) {
          return loaders.namesForContestIds.load(obj.id);
        },
      },
    };
  },
});

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

const ContestName = require('./../types/ContestName');
const ContestStatus = require('./ContestStatus');

module.exports = new GraphQLObjectType({
  name: 'Contest',
  fields: {
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
      type: new GraphQLNonNull(ContestStatus),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    names: {
      type: new GraphQLList(ContestName),
      resolve(obj, args, context) {
        return context.loaders.namesForContestIds.load(obj.id);
      },
    },
  },
});

const { GraphQLUnionType } = require('graphql');

const ContestType = require('./Contest');
const NameType = require('./NameForContest');

module.exports = new GraphQLUnionType({
  name: 'Activity',
  description: 'Uma atividade pode ser um Contest ou um Nome',
  types: [ContestType, NameType],

  // GraphQL usa resolveType para decidir a qual tipo um dado pertence
  resolveType(value) {
    return value.activityType === 'contest' ? ContestType : NameType;
  },
});

const { camelizeKeys } = require('humps');
const _ = require('lodash');

const orderedFor = (tableRows, collection, field, isSingleObject) => {
  // Converte para camelCase todas as linhas da tabela
  const camelizededData = camelizeKeys(tableRows);

  return collection.map(element => {
    const inGroupsOfField = _.groupBy(camelizededData, field);
    const elementArray = inGroupsOfField[element];

    if (elementArray) {
      return isSingleObject ? elementArray[0] : elementArray;
    }

    return isSingleObject ? {} : [];
  });
};

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor,
  slug: string => string.toLowerCase().replace(/[\s\W-]+/, '-'),
};

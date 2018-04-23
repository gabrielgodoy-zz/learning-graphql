const { camelizeKeys } = require('humps');
const _ = require('lodash');

const orderedFor = (tableRows, collection, field, singleObject) => {
  // Converte para camelCase todas as chave do objeto
  const formattedData = camelizeKeys(tableRows);
  const inGroupsOfField = _.groupBy(formattedData, field);

  return collection.map(element => {
    const elementArray = inGroupsOfField[element];

    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }

    return singleObject ? {} : [];
  });
};

module.exports = {
  nodeEnv: process.env.NODE_ENV || 'development',
  orderedFor,
  slug(string) {
    return string.toLowerCase().replace(/[\s\W-]+/, '-');
  },
};

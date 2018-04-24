const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

const DataLoader = require('dataloader');

// CONECTA o Postgres
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig); // Iniciando uma conexão pool
const pgdb = require('../database/postgres/pgdb')(pgPool);

// CONECTA o MongoDB
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mongoConfig = require('./../config/mongo')[nodeEnv];

const app = require('express')();
const graphqlHTTP = require('express-graphql');

MongoClient.connect(mongoConfig.url, (err, mongoPool) => {
  assert.equal(err, null);

  const mongodb = require('./../database/mongodb/mongodb')(mongoPool);

  // Definindo a rota no express
  app.use('/graphql', (req, res) => {
    /*
      Funções de batching (carregamento em lote) da biblioteca DataLoader
      Loaders vão ser inicializados a cada request para essa rota

      Função dentro do DataLoader recebe um array de chaves
      E promete retornar um array de valores para cada uma dessas chaves
    */
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByIds),
      usersByApiKeys: new DataLoader(pgdb.getUsersByApiKeys),
      namesForContestIds: new DataLoader(pgdb.getNamesForContestIds),
      contestsForUserIds: new DataLoader(pgdb.getContestsForUserIds),
      totalVotesByNameIds: new DataLoader(pgdb.getTotalVotesByNameIds),
      activitiesForUserIds: new DataLoader(pgdb.getActivitiesForUserIds),
      mongodb: {
        usersByIds: new DataLoader(mongodb.getUsersByIds),
      },
    };

    const appSchema = require('../schemas');
    return graphqlHTTP({
      schema: appSchema,
      graphiql: true, // Ativa o editor visual GraphiQL
      context: {
        // Conexão com o Postgres e MongoDB ficará disponível
        // no contexto de todos os resolvers
        pgPool,
        mongoPool,
        loaders,
      },
    })(req, res);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

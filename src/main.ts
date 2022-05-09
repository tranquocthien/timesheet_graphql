import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';
import { Container } from 'typedi';
import { buildSchema } from 'type-graphql';
import { WorkingTimeResolver } from './core/resolvers';
import { PersonAPI } from './dataSources/Person';

const main = async () => {
  const PORT = process.env.PORT || 4000;
  const app = express();
  const httpServer = http.createServer(app);
  const graphqlScheme = await buildSchema({
    resolvers: [WorkingTimeResolver],
    container: Container,
  });
  const server = new ApolloServer({
    schema: graphqlScheme,
    context: ({ req, res }) => ({ req, res }),
    dataSources: () => ({
      personAPI: new PersonAPI(),
    }),
  });

  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  }); // it's same app.use(server.getMiddleware(options))

  await new Promise(() =>
    httpServer.listen(PORT, () => {
      console.log(
        `Server ready at http://localhost:${PORT}${server.graphqlPath}`
      );
    })
  );
};

main().catch(console.error);

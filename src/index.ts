import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Container } from "typedi";
import { UserResolver } from "./modules/user/user.resolver";
import { EmoteResolver } from "./modules/emote/emote.resolver";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [UserResolver, EmoteResolver],
    container: Container
  });

  const apolloServer = new ApolloServer({
    typeDefs: {},
    schema,
    context: {},
    introspection: true,
    playground: {
      settings: {
        "editor.theme": "dark"
      },
      tabs: [
        {
          endpoint: "/graphql"
        }
      ]
    } as any
  });

  const app = express();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready fool`);
  });
};

main();

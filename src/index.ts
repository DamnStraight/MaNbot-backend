import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { Container } from "typedi";
import { UserResolver } from "./modules/user/user.resolver";
import { EmoteResolver } from "./modules/emote/emote.resolver";
import { EmoteCountResolver } from "./modules/emoteCount/emoteCount.resolver";
import { MessageResolver } from "./modules/message/message.resolver";
import { GuildResolver } from "./modules/guild/guild.resolver";
import { ChannelResolver } from "./modules/channel/channel.resolver";
import { createServer } from "http";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      EmoteResolver,
      EmoteCountResolver,
      MessageResolver,
      GuildResolver,
      ChannelResolver
    ],
    container: Container,
    validate: false
  });

  const apolloServer = new ApolloServer({
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
  apolloServer.applyMiddleware({ app });

  const httpServer = createServer(app);
  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready fool`);
  });
};

main();

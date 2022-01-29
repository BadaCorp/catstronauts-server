import { ApolloServer } from "apollo-server";
import TrackAPI from "./datasources/track-api";
import resolvers from "./resolver";
import { typeDefs } from "./schema";

async function startApolloServer(typeDefs: any, resolvers: any) {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
      return {
        trackAPI: new TrackAPI(),
      };
    },
  });

  const { url, port } = await server.listen({ port: process.env.PORT || 4000 });

  console.log(`
      🚀  Server is running
      🔉  Listening on port ${port}
      📭  Query at ${url}
    `);
}

startApolloServer(typeDefs, resolvers);

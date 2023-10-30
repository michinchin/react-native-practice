import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers, typeDefs } from "./CardDealerServer";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

app().catch((err) => console.error(err));

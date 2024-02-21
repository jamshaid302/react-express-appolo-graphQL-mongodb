import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import routes from "./routes/index.js";
import typesDefs from "./graphql/schema/graphql-schema.js";
import resolvers from "./graphql/resolvers/index.js";

const startApplloServer = async () => {
  const server = new ApolloServer({
    typeDefs: typesDefs,
    resolvers: resolvers,
    context: async ({ req, res, next }) => {
      try {
        // const token = req.headers.authorization || "";
        // if (!token) return res.status(401).json({ message: "Unauthorized" });
      } catch (error) {
        console.error(error);
      }
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: "GET,PUT,PATCH,POST,DELETE",
  })
);

app.use("/api", routes);
startApplloServer();

export default app;

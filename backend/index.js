import app from "./src/app.js";
import * as dotenv from "dotenv";
dotenv.config();
import { connect } from "./src/utility/conn.js";

const runServer = async () => {
  // Connect to the database
  await connect().then(() => {
    console.log("Connected to the database");
  });

  // start the server
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on port http://localhost:${process.env.PORT}`
    );
  });
};

runServer();

export default app;

import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let types = "";

fs.readdirSync(__dirname).forEach((file) => {
  if (file.includes(".graphql")) {
    types += `\n\n${fs.readFileSync(path.join(__dirname, file))}`;
  }
});

const typeDefs = types;

export default typeDefs;

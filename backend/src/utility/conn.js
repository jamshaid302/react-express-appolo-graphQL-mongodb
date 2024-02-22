import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.DB_URL;
const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db();
    await createCollectionIfNotExists(db, "tasks", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            createdAt: {
              bsonType: "date",
            },
            updatedAt: {
              bsonType: "date",
            },
          },
        },
      },
    });
  } catch (error) {
    console.log("Error in connecting to the database", error);
    throw new Error(error);
  } finally {
    // await client.close();
  }
}

async function createCollectionIfNotExists(db, collectionName, options) {
  const collections = await db
    .listCollections({ name: collectionName })
    .toArray();

  if (collections.length === 0) {
    await db.createCollection(collectionName, options);
    console.log(`Created '${collectionName}' collection`);
  } else {
    console.log(
      `'${collectionName}' collection already exists. Skipping creation.`
    );
  }
}

export { connect, db };

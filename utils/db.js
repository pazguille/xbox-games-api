const { URL } = require('url');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGODB_URI } = process.env;

let dbClient = null;

async function connectToDB() {
  if (dbClient) {
    return dbClient;
  }

  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  });

  await client.connect();

  // Select the database through the connection,  using the database path of the connection string
  const { pathname } = new URL(MONGODB_URI);
  const db = await client.db(pathname.substr(1));
  dbClient = db;
  return db;
}

module.exports = connectToDB;

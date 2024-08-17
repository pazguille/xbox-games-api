const connectToDB = require('../utils/db');

async function connectTCollections() {
  const db = await connectToDB();
  return await db.collection('collections');
}

async function find(query) {
  try {
    const collections = await connectTCollections();
    const collection = await collections.findOne(
      { type: query.type },
      { projection: {
        _id: 0,
        type: 1,
        ids: {
          $slice: [query.skipitems, query.count],
        },
      }},
    );
    return collection;
  } catch (err) {
    console.log(err);
    return;
  }
}

async function bulkUpdate(data) {
  try {
    const collections = await connectTCollections();
    const updated = await collections.bulkWrite(
      data.map(collection => ({
        updateOne: {
          filter: { type: collection.type },
          update: { $set: collection },
          upsert: true,
        }
      })),
    );
    return updated;
  } catch (err) {
    console.log(err);
    return;
  }
}

module.exports = {
  find,
  bulkUpdate,
};

const connectToDB = require('../utils/db');

async function connectToGames() {
  const db = await connectToDB();
  return await db.collection('games');
}

async function find(query, options) {
  // {title: {$regex: 'Kena', $options: 'i'}}
  // {title: {$regex: 'Far.*Cry.*6', $options: 'i}}
  // {"$or": [{"title": {"$regex": "dragones", "$options": "i"}}, {"description": {"$regex": "dragones", "$options": "i"}}]}
  const q = query;
  const o = options || {};

  // const q = query ? { id: { $in: query.ids } } : {};
  const games = await connectToGames();
  return await games
    .find(q, o)
    .hint( { $natural : 1 } )
    .toArray();
}

async function random({ count }) {
  const games = await connectToGames();
  const cursor = games
    .aggregate([
      {
        $match: {
          'price.amount': { $gt: 0 }
        }
      },
      {
        $sample: {
          size: count,
        }
      }
    ])
    .project({ _id: 0, id: 1 })

  return await cursor.toArray();
}

async function bulkUpdate(data) {
  try {
    const games = await connectToGames();
    const updated = await games.bulkWrite(
      data.map(game => ({
        updateOne: {
          filter: { id: game.id },
          update: { $set: game },
          upsert: true,
        }
      })),
    );
    return updated;
  } catch {
    return;
  }
}

module.exports = {
  find,
  random,
  bulkUpdate,
};

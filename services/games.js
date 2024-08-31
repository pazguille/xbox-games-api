const connectToDB = require('../utils/db');

async function connectToGames() {
  const db = await connectToDB();
  return await db.collection('games');
}

async function find(query) {
  //  {title: {$regex: 'Kena', $options: 'i'}}
  const q = query ? { id: { $in: query.ids } } : {};
  const games = await connectToGames();
  return await games
    .find(q)
    .hint( { $natural : 1 } )
    .project({ _id: 0 })
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

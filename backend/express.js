require('dotenv').config();

const crypto = require('crypto');
const { MongoClient } = require('mongodb');
const { createApp } = require('./app');

const PORT = Number(process.env.PORT) || 3000;
const DATABASE_NAME = 'quickcure';

async function connectWithRetry(client, attempts = 5) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await client.connect();
      return client.db(DATABASE_NAME);
    } catch (error) {
      console.error(`MongoDB connection attempt ${attempt} failed.`, { name: error.name, code: error.code });
      if (attempt === attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  throw new Error('MongoDB connection failed.');
}

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not configured. Add it to backend/.env.');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    const db = await connectWithRetry(client);
    const jwtSecret = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
    if (!process.env.JWT_SECRET) {
      console.warn('JWT_SECRET is not configured; active sessions will need to log in again after a backend restart.');
    }

    const app = createApp({ db, jwtSecret });
    const server = app.listen(PORT, () => console.log(`QuickCure API listening on port ${PORT}`));
    const close = async () => {
      server.close(async () => {
        await client.close();
        process.exit(0);
      });
    };
    process.once('SIGINT', close);
    process.once('SIGTERM', close);
    return { app, server, client, db };
  } catch (error) {
    await client.close();
    throw error;
  }
}

if (require.main === module) {
  startServer().catch((error) => {
    if (error.message === 'MONGODB_URI is not configured. Add it to backend/.env.') {
      console.error(error.message);
    } else {
      console.error('QuickCure backend could not start.', { name: error.name, code: error.code });
    }
    process.exitCode = 1;
  });
}

module.exports = { startServer, connectWithRetry, DATABASE_NAME };

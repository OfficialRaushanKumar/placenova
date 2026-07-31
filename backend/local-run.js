const { MongoMemoryServer } = require('mongodb-memory-server');

(async () => {
  try {
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('mongodb+srv')) {
      const mongod = await MongoMemoryServer.create();
      process.env.MONGODB_URI = mongod.getUri();
      console.log('Started in-memory MongoDB at', process.env.MONGODB_URI);

      // Ensure the in-memory server is stopped on exit
      const stop = async () => {
        await mongod.stop();
        process.exit(0);
      };
      process.on('SIGINT', stop);
      process.on('SIGTERM', stop);
    }

    // Start the app (server.js will read process.env.MONGODB_URI)
    require('./src/server');
  } catch (err) {
    console.error('Failed to start local-run:', err);
    process.exit(1);
  }
})();

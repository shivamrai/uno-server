const dbConfig = require('./config/config').database;
const mongoClient = require('mongodb').MongoClient;

const dbUrl = `${dbConfig.url}:${dbConfig.port}`;

class DatabaseConnect {
  constructor() {
    this.client = null;
  }

  connect() {
    if(this.client) return Promise.resolve(this.client);

    return new Promise((resolve, reject) => {
      mongoClient.connect(dbUrl, (error, client) => {
        if(error) return reject(error);
        this.client = client;
        resolve(client);
      });
    });
  }
};

module.exports = new DatabaseConnect();
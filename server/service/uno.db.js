const dbName = require('./config/config').database.name;
const dbConnect = require('./db.connect');

class UnoDB {
  constructor() {
    this.db = null;
    this.client = null;
  }

  connect() {
    if(this.client) return Promise.resolve();

    return dbConnect
      .connect()
      .then(client => {
        this.client = client;
      })
  }

  // gameId, playerName
  addPlayer(data) {

  }
}

module.exports = new UnoDB();
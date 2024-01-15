const redis = require('redis');
const { promisify } = require('util');
const config = require("../config");

const client = redis.createClient(config.redis);

const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  async get(key) {
    try {
      const value = await getAsync(key);
      return value;
    } catch (error) {
      throw new Error(`Error retrieving data from Redis: ${error}`);
    }
  },

  async set(key, value) {
    try {
      await setAsync(key, value);
    } catch (error) {
      throw new Error(`Error storing data in Redis: ${error}`);
    }
  },

};

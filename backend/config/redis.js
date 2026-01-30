const { createClient } = require("redis");

const redis = createClient({
    host: localhost,
    port: 6379
});
redis.connect();

module.exports = redis;

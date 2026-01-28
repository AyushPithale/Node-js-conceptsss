const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// Event Listeners
client.on("error", (err) => {
  console.log("Redis client error occured!", err);
});

async function testRedisConnection() {
  try {
    await client.connect();
    console.log("redis is connected");

    await client.set("name", "ayush");

    const extractvalue = await client.get("name");
    console.log(extractvalue);

    const deleteCount = await client.del("name");
    console.log(deleteCount);

    const extractupdatedvalue = await client.get("name");
    console.log("extractupdatedvalue", extractupdatedvalue);

    await client.set("count", "100");
    const incrementCount = await client.incr("count");
    console.log("incremented", incrementCount);

    const dicrementCount = await client.decr("count");
    console.log("dicrementCount", dicrementCount);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

testRedisConnection();

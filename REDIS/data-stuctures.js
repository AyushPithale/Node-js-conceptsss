const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

// Event Listeners
client.on("error", (err) => {
  console.log("Redis client error occured!", err);
});

async function redisDataStructures() {
  try {
    await client.connect();
    console.log("redis is connected");

    // Strings  ->
    // SET to store a sting value with a key ,
    // GET  -> get value pair ,
    // MSET ->> multiple value store
    // MGET ->  get multiple value pairs

    await client.set("user:name", "ayush");
    const name = await client.get("user:name");
    console.log("name", name);

    await client.mSet([
      "user:email",
      "aag@a.com",
      "user:age",
      "23",
      "user:country",
      "india",
    ]);

    const [age, email, country] = await client.mGet([
      "user:age",
      "user:email",
      "user:country",
    ]);

    console.log("age, email, country", age, email, country);

    /// LIST
    // Lpush ->> insert ele in begging of list
    // Rpush ->> insert ele in end of list
    // Lrange ->> retrive ele from spcific range
    // Lpop  -->> remove and return the first ele from list
    // Rpop ->> remove and return the last ele from the list

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);

    // Lrange
    const extractAllNotes = await client.lRange("notes", 0, -1); // it will retrun all the elements from
    console.log("extractAllNotes", extractAllNotes);

    // Lpop
    const extractFirstNote = await client.lPop("notes");
    console.log("extractFirstNote", extractFirstNote);

    //
    const remainingNotes = await client.lRange("notes", 0, -1);
    console.log(remainingNotes);

    // Rpush
    await client.rPush("notes", ["note 10"]);
    const remainingNotesNew = await client.lRange("notes", 0, -1);
    console.log(remainingNotesNew);
  } catch (error) {
    console.error(error);
  } finally {
    await client.quit();
  }
}

redisDataStructures();

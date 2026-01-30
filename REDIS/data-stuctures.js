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

    // await client.set("user:name", "ayush");
    // const name = await client.get("user:name");
    // console.log("name", name);

    // await client.mSet([
    //   "user:email",
    //   "aag@a.com",
    //   "user:age",
    //   "23",
    //   "user:country",
    //   "india",
    // ]);

    // const [age, email, country] = await client.mGet([
    //   "user:age",
    //   "user:email",
    //   "user:country",
    // ]);

    // console.log("age, email, country", age, email, country);

    // /// LIST
    // Lpush ->> insert ele in begging of list
    // Rpush ->> insert ele in end of list
    // Lrange ->> retrive ele from spcific range
    // Lpop  -->> remove and return the first ele from list
    // Rpop ->> remove and return the last ele from the list

    // await client.lPush("notes", ["note 1", "note 2", "note 3"]);

    // Lrange
    // const extractAllNotess = await client.lRange("notes", 0, -1); // it will retrun all the elements from
    // console.log("extractAllNotes", extractAllNotess);

    // // Lpop
    // const extractFirstNote = await client.lPop("notes");
    // console.log("extractFirstNote", extractFirstNote);

    // //
    // const remainingNotes = await client.lRange("notes", 0, -1);
    // console.log(remainingNotes);

    // // Rpush
    // await client.rPush("notes", ["note 10"]);
    // const remainingNotesNew = await client.lRange("notes", 0, -1);
    // console.log(remainingNotesNew);

    // ---> SETS
    // SAdd ->> add ele to set
    // SMembers ->> get all ele from set
    // SISMEMBER ->> check if ele is present in set
    // SRem ->> remove ele from set
    // SCard ->> get the number of ele in set
    // SPop ->> remove and return a random ele from set
    // SRandMember ->> return a random ele from set
    // SUnion ->> return the union of two sets
    // SInter ->> return the intersection of two sets
    // SDiff ->> return the difference of two sets

    // await client.sAdd("user:nickName", ["ayush", "john", "peter"]);

    // const allMembers = await client.sMembers("user:nickName");
    // console.log("allmembres", allMembers);

    // const isMembers = await client.sIsMember("user:nickName", "ayush");
    // console.log("isMembers", isMembers);

    // await client.sRem("user:nickName", "john");
    //     const UpdatedallMembers = await client.sMembers("user:nickName");
    // console.log("UpdatedallMembers", UpdatedallMembers);

    // Sorted SETS
    // zAdd -> add ele to sorted set
    // zRange -> get ele from sorted set
    // zRem -> remove ele from sorted set
    // zCard -> get the number of ele in sorted set
    // zScore -> get the score of ele in sorted set
    // zRank -> get the rank of ele in sorted set
    // zRevRank -> get the rank of ele in sorted set
    // zRangeByScore -> get ele from sorted set by score
    // zRevRangeByScore -> get ele from sorted set by score
    // zRemRangeByScore -> remove ele from sorted

    // await client.zAdd("cart", [
    //   {
    //     score: 100,
    //     value: "cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "cart 2",
    //   },
    //   {
    //     score: 130,
    //     value: "cart 3",
    //   },
    // ]);

    // const allCarts = await client.zRange("cart", 0, -1);
    // console.log("allCarts", allCarts);

    // const extractCartItmWithScore = await client.zRangeWithScores(
    //   "cart",
    //   0,
    //   -1,
    // );

    // console.log("extractCartItmWithScore", extractCartItmWithScore);

    // const cartToRank = await client.zRank("cart", "cart 3");
    // console.log("cartToRank", cartToRank);

    // HASHES
    // HSET ->> add ele to hash
    // HGET ->> get ele from hash
    // HMSET ->> add multiple ele to hash
    // HMGET ->> get multiple ele from hash
    // HGETALL ->> get all ele from hash
    // HDEL ->> remove ele from hash
    // HKEYS ->> get all keys from hash
    // HVALS ->> get all values from hash
    // HLEN ->> get the number of ele in hash
    // HINCRBY ->> increment ele in hash
    // HDECRBY ->> decrement ele in hash

    await client.hSet("product:1", {
      name: "product1",
      description: "description of product1",
      rating: "4.5",
    });

    const getProductRating = await client.hGet("product:1", "rating");
    console.log("getProductRating", getProductRating);

    const getAllProducts = await client.hGetAll("product:1");
    console.log("getAllProducts", getAllProducts);

    await client.hDel("product:1", "rating");
    const updatedProduct = await client.hGetAll("product:1");
    console.log("updatedProduct", updatedProduct);
  } catch (error) {
    console.error("error", error);
  } finally {
    client.quit();
  }
}

redisDataStructures();

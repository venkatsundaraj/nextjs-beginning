import { MongoClient } from "mongodb";

const handler = async function (req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);

    const client = await MongoClient.connect(
      "mongodb+srv://venkatsundaraj:15312621648@meetups.lbvzukd.mongodb.net/meetups?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupCollections = db.collection("meetups");

    const result = await meetupCollections.insertOne(data);

    console.log(result);
    client.close();

    res.status(201).json({ message: "meetups updated" });
  }
};

export default handler;

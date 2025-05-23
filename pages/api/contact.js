import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    try {
      client = await MongoClient.connect(process.env.MONGODB_URI);
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to database." });
      return;
    }
    const db = client.db();
    const collection = db.collection("messages");
    try {
      const result = await collection.insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed." });
      return;
    }
    client.close();
    res.status(201).json({ message: "Message stored!", message: newMessage });
  }
}

export default handler;

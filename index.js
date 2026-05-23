const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to IdeaVault server");
});

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    const db = client.db("IdeaVault");
    const ideaColl = await db.collection("Ideas");
    const commentsColl = await db.collection("Comments");
    const categoriesColl = await db.collection("Categories");

    // All get here

    app.get("/categories", async (req, res) => {
      const allCategories = await categoriesColl.find().toArray();
      res.json(allCategories);
    });

    app.get("/trendingIdeas", async (req, res) => {
      const allFeaturedIdeas = await ideaColl.find().limit(6).toArray();
      res.json(allFeaturedIdeas);
    });
    app.get("/ideas", async (req, res) => {
      const allIdeas = await ideaColl.find().toArray();
      res.json(allIdeas);
    });
    app.get("/idea/:id", async (req, res) => {
      const id = req.params.id;
      const idea = await ideaColl.findOne({
        _id: new ObjectId(id),
      });
      res.json(idea);
    });
    app.get("/searchedIdeas", async (req, res) => {
      const searchData = req.query.search;
      const searchedIdeas = await ideaColl
        .find({
          $or: [
            { name: { $regex: searchData, $options: "i" } },
            { category: { $regex: searchData, $options: "i" } },
          ],
        })
        .toArray();
      res.json(searchedIdeas);
    });
    app.get("/popularCategories", async (req, res) => {
      const allCategories = await categoriesColl.find().limit(6).toArray();
      res.json(allCategories);
    });
    app.get("/comments", async (req, res) => {
      const result = await commentsColl.find().toArray();
      res.json(result);
    });

    // All Post here
    app.post("/idea", async (req, res) => {
      const ideaInf = req.body;

      const result = await ideaColl.insertOne(ideaInf);

      res.json(result);
    });

    app.post("/comment", async (req, res) => {
      const commentInf = req.body;
      const result = await commentsColl.insertOne(commentInf);
      res.json(result);
    });

    // All Patch here
    app.patch("/comment/:id", async (req, res) => {
      console.log(req.params);
      const id = req.params.id;
      const commentInf = req.body;

      const result = await commentsColl.updateOne(
        { _id: new ObjectId(id) },
        { $set: commentInf },
      );
      res.json(result);
    });

    // All delete here

    app.delete("/comment/:id", async (req, res) => {
      const { id } = req.params;

      const result = await commentsColl.deleteOne({ _id: new ObjectId(id) });
      res.json(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Port is running in http://localhost:${port}`);
});

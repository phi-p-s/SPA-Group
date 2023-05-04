import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';
import CardsRouter from "./cards.js";
import { MongoClient } from 'mongodb';

const port = 3001;
const app = express();

let uri = 'mongodb://127.0.0.1:27017';
let client = new MongoClient(uri);
await client.connect();
let db = client.db('deckbuilder_database');

let deckCollection = db.collection('decks');
let cardCollection = db.collection('cards');
let nextId = 0;

const DecksRouter = Router();

CardsRouter.mergeParams = true;

DecksRouter.use("/decks/:deck_id/cards", CardsRouter)

async function findDeckById(id) {
    //Need to update with params
    const queryParams = {
        _id: id
    };
    let retVal = await deckCollection.find(queryParams).toArray();
    return retVal;
}

async function findAllDecks() {
    const queryParams = {};
    let retVal = await deckCollection.find(queryParams).toArray();
    return retVal;
}


async function createDeckDoc(jsonIn) {

    //Need to update with params
    //const deck = {
    //  _id: Number(id),
    //  name: nameIn
    //};
    await deckCollection.insertOne(jsonIn);
}



//ItemsRouter.mergeParams = true;
//DecksRouter.use("/:deck_id/items", ItemsRouter);

// Use the JSON parsing middleware so we can access it via `req.body`
app.use(express.json());
app.use(cors());
app.use(DecksRouter);


DecksRouter.get("/decks", async(req, res) => {
    //const directoryContents = await fs.readdir('storage/');
    //const allDecks = {
    //  decks: [],
    //  count: directoryContents.length
    //};

    //for (const entry of directoryContents) {
    //  const contents = await fs.readFile(`storage/${entry}`);
    //  allDecks.decks.push(JSON.parse(contents));
    //}
    const queryParams = {};
    let retVal = await deckCollection.find(queryParams).toArray();
    res.send(retVal);
});

DecksRouter.get("/decks/:deck_id", async(req, res) => {
    const deck_id = req.params.deck_id;
    console.log(deck_id);
    try {
        //const post = await fs.readFile(`storage/${deck_id}.json`);
        const queryParams = {
            id: deck_id
        };
        let retVal = await deckCollection.find(queryParams).toArray();
        console.log(retVal)
        res.json(retVal);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }

});


// creates a new json
DecksRouter.post("/decks", async(req, res) => {
    const requestBody = req.body;
    requestBody.id = uuidv4();
    createDeckDoc(requestBody);
    //await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
});

//NOT USED
DecksRouter.put("/decks/:deck_id", async(req, res) => {

    const deck_id = req.params.deck_id;
    const requestBody = req.body;
    requestBody.id = deck_id;

    await fs.writeFile(`storage/${deck_id}.json`, JSON.stringify(requestBody));

});

//NOT USED
DecksRouter.delete("/decks/:deck_id", async(req, res) => {
    const deck_id = req.params.deck_id;
    await fs.unlink(`storage/${deck_id}.json`);
    res.status(201);
    res.send('');
});

app.listen(port, () => {
    console.log(`Server listening on localhost:${port}`);
})
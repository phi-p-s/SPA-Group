import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';
import { MongoClient } from 'mongodb';

let uri = 'mongodb://127.0.0.1:27017';
let client = new MongoClient(uri);
await client.connect();
let db = client.db('deckbuilder_database');
let deckCollection = db.collection('decks');
let cardCollection = db.collection('cards');

const CardsRouter = Router();
export default CardsRouter;


async function findCardById(id) {
    //Need to update with params
    console.log(id);
    const queryParams = { _id: id };
    const retVal = await cardCollection.findOne(queryParams);
    return retVal;
}

async function findCardByDeck(id) {
    //Need to update with params
    const queryParams = { deck_id: id };
    const retVal = await cardCollection.find(queryParams).toArray();
    console.log(retVal);
    return retVal;
}

async function createCardDoc(jsonIn) {

    //Need to update with params
    //const card = {
    //  _id: Number(id),
    //  name: nameIn,
    //  quantity: quantityIn,
    //  price: priceIn,
    //  deck_id: deck_id_in 
    //};
    await cardCollection.insertOne(jsonIn);
}

//Get specific card
CardsRouter.get("/", async(req, res) => {
    //const directoryContents = await fs.readdir(`storage/${deck_id}`);
    //const allCards = {
    //  cards: [],
    //  count: directoryContents.length
    //};
    //
    //for (const entry of directoryContents) {
    //  const contents = await fs.readFile(`storage/${entry}`);
    //  allCards.cards.push(JSON.parse(contents));
    //}
    const queryParams = { deck_id: req.params.deck_id };
    console.log(queryParams)
    let retVal = await cardCollection.find(queryParams).toArray();
    console.log(retVal)
    res.send(retVal);
})

//Get specific card
CardsRouter.get("/:card_id", async(req, res) => {
    const deck_id = req.params.deck_id;
    const card_id = req.params.card_id;
    console.log("HI");
    try {
        //const post = await fs.readFile(`storage/${deck_id}.json`);
        const queryParams = {
            deck_id: deck_id,
            id: card_id
        };
        let retVal = await cardCollection.find(queryParams).toArray();
        console.log(retVal)
        res.json(retVal);
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
})

//Create card
CardsRouter.post("/", async(req, res) => {
    console.log("Ayo")
    const requestBody = req.body;
    console.log(requestBody);
    requestBody.id = uuidv4();

    createCardDoc(requestBody);
    //await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
})
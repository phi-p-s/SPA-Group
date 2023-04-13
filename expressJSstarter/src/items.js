import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';
import { MongoClient } from 'mongodb';

let uri = 'mongodb://127.0.0.1:27017';
let client = new MongoClient(uri);
await client.connect();
let db = client.db('local');
let storeCollection = db.collection('stores');
let itemCollection = db.collection('items');

const ItemsRouter = Router();
export default ItemsRouter;


async function findItemById(id) {
    //Need to update with params
    console.log(id);
    const queryParams = { _id: id };
    const retVal = await itemCollection.findOne(queryParams);
    return retVal;
}

async function findItemByStore(id) {
    //Need to update with params
    console.log("HERE");
    const queryParams = { store_id: id };
    const retVal = await itemCollection.find(queryParams).toArray();
    console.log(retVal);
    return retVal;
}

async function createItemDoc(jsonIn) {

    //Need to update with params
    //const item = {
    //  _id: Number(id),
    //  name: nameIn,
    //  quantity: quantityIn,
    //  price: priceIn,
    //  store_id: store_id_in 
    //};
    await itemCollection.insertOne(jsonIn);
}

//Get specific item
ItemsRouter.get("/", async(req, res) => {
    //const directoryContents = await fs.readdir(`storage/${store_id}`);
    //const allItems = {
    //  items: [],
    //  count: directoryContents.length
    //};
    //
    //for (const entry of directoryContents) {
    //  const contents = await fs.readFile(`storage/${entry}`);
    //  allItems.items.push(JSON.parse(contents));
    //}
    const queryParams = { store_id: req.params.store_id };
    console.log(queryParams)
    let retVal = await storeCollection.find(queryParams).toArray();
    console.log(retVal)
    res.send(retVal);
})

//Get specific item
ItemsRouter.get("/:item_id", async(req, res) => {
    const item_id = req.params.item_id;
    try {
        //const post = await fs.readFile(`storage/${item_id}.json`);
        res.json(findItemById(item_id));
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send('');
    }
})

//Create item
ItemsRouter.post("/", async(req, res) => {
    console.log("Ayo")
    const requestBody = req.body;
    console.log(requestBody);
    requestBody.id = uuidv4();

    createItemDoc(requestBody);
    //await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
})
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
let nextId = 0;
export default ItemsRouter;


async function findItemById(id){
  //Need to update with params
  const queryParams = {_id : Number(id)};
  const retVal = await itemCollection.findOne(queryParams);
  console.log(retVal);
}

async function findItemByStore(id){
  //Need to update with params
  const queryParams = {store_id : Number(id)};
  const retVal = await itemCollection.find(queryParams).toArray();
  console.log(retVal);
}

async function createItemDoc(jsonIn){
  
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
ItemsRouter.get("/stores/:store_id/items", async (req, res) => {
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
    const store_id = req.params.store_id;
    res.send(findItemByStore(store_id));
})

//Get specific item
ItemsRouter.get("/stores/:store_id/items/:item_id", async (req, res) => {
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
ItemsRouter.post("/stores/:store_id/items", async (req, res) => {
    const requestBody = req.body;
    console.log(requestBody);
    requestBody.id = nextId;
    nextId += 1;

    createItemDoc(requestBody);
    //await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
})
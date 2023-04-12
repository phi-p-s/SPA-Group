import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';
import ItemsRouter from "./items.js";
import { MongoClient } from 'mongodb';

const port = 3001;
const app = express();

let uri = 'mongodb://localhost:27017';
let client = new MongoClient(uri);
await client.connect();
let db = client.db('local');
let storeCollection = db.collection('stores');
let itemCollection = db.collection('items');
const StoresRouter = Router();

async function findStoreById(){
  //Need to update with params
  const queryParams = {_id : 1
  };
  let retVal = await storeCollection.find(queryParams).toArray();
  console.log(retVal);
}

async function findItemById(){
  //Need to update with params
  const queryParams = {_id : 2};
  const retVal = await itemCollection.findOne(queryParams);
  console.log(retVal);
}

async function createStoreDoc(){
  
  //Need to update with params
  const store = {
    _id: 2,
    name: 'Second Store Store'
  };
  await storeCollection.insertOne(store);
}

async function createItemDoc(){
  
  //Need to update with params
  const item = {
    _id: 2,
    name: 'Item',
    quantity: 1,
    price: 1.99,
    store_id: 1 
  };
  await itemCollection.insertOne(item);
}

//ItemsRouter.mergeParams = true;
//StoresRouter.use("/:store_id/items", ItemsRouter);

// Use the JSON parsing middleware so we can access it via `req.body`
app.use(express.json());
app.use(cors());
app.use(StoresRouter);


StoresRouter.get("/stores", async (req, res) => {
  const directoryContents = await fs.readdir('storage/');
  const allStores = {
    stores: [],
    count: directoryContents.length
  };

  for (const entry of directoryContents) {
    const contents = await fs.readFile(`storage/${entry}`);
    allStores.stores.push(JSON.parse(contents));
  }

  res.send(allStores);
});

StoresRouter.get("/stores/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  try {
    const post = await fs.readFile(`storage/${store_id}.json`);
    res.json(JSON.parse(post));
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('');
  }
});


// creates a new json
StoresRouter.post("/stores", async (req, res) => {
  const requestBody = req.body;
  requestBody.id = uuidv4();
  await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
  res.status(201);
  res.send('');
});

//NOT USED
StoresRouter.put("/stores/:store_id", async(req, res) => {

  const store_id = req.params.store_id;
  const requestBody = req.body;
  requestBody.id = store_id;

  await fs.writeFile(`storage/${store_id}.json`, JSON.stringify(requestBody));

});

//NOT USED
StoresRouter.delete("/stores/:store_id", async (req, res) => {
  const store_id = req.params.store_id;
  await fs.unlink(`storage/${store_id}.json`);
  res.status(201);
  res.send('');
});

app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
})

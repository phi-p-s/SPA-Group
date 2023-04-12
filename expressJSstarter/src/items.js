import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';

const ItemsRouter = Router();

export default ItemsRouter;

//Get specific item
ItemsRouter.get("/stores/:store_id/items", async (req, res) => {
    const directoryContents = await fs.readdir(`storage/${store_id}`);
    const allItems = {
      items: [],
      count: directoryContents.length
    };
  
    for (const entry of directoryContents) {
      const contents = await fs.readFile(`storage/${entry}`);
      allItems.items.push(JSON.parse(contents));
    }
  
    res.send(allItems);
})

//Get specific item
ItemsRouter.get("/stores/:store_id/items/:item_id", async (req, res) => {
    const item_id = req.params.item_id;
    try {
      const post = await fs.readFile(`storage/${item_id}.json`);
      res.json(JSON.parse(post));
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send('');
    }
})

//Create item
ItemsRouter.post("/stores/:store_id/items", async (req, res) => {
    const requestBody = req.body;
    requestBody.id = uuidv4();
    await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
    res.status(201);
    res.send('');
})
import express, { json, Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'node:fs/promises';
import cors from 'cors';


const port = 3001;
const app = express();


const todosRouter = Router();

// Use the JSON parsing middleware so we can access it via `req.body`
app.use(express.json());
app.use(cors());
app.use(todosRouter);

todosRouter.get("/todo", async (req, res) => {
  const directoryContents = await fs.readdir('storage/');
  const allTodos = {
    todos: [],
    count: directoryContents.length
  };

  for (const entry of directoryContents) {
    const contents = await fs.readFile(`storage/${entry}`);
    allTodos.todos.push(JSON.parse(contents));
  }

  res.send(allTodos);
});


todosRouter.get("/todo/:todoId", async (req, res) => {

const todoId = req.params.todoId;
try {
  const post = await fs.readFile(`storage/${todoId}.json`);
  res.json(JSON.parse(post));
} catch (e) {
  console.log(e);
  res.status(500);
  res.send('');
}
});


// creates a new json
todosRouter.post("/todo", async (req, res) => {
  const requestBody = req.body;
  requestBody.id = uuidv4();
  await fs.writeFile(`storage/${requestBody.id}.json`, JSON.stringify(requestBody));
  res.status(201);
  res.send('');

});


// updates an already existing json when given an id
todosRouter.put("/todo/:todoId", async(req, res) => {

  const todoId = req.params.todoId;
  const requestBody = req.body;
  requestBody.id = todoId;

  await fs.writeFile(`storage/${todoId}.json`, JSON.stringify(requestBody));

});


todosRouter.delete("/todo/:todoId", async (req, res) => {
  const todoId = req.params.todoId;
  await fs.unlink(`storage/${todoId}.json`);
  res.status(201);
  res.send('');

});


app.listen(port, () => {
  console.log(`Server listening on localhost:${port}`);
})


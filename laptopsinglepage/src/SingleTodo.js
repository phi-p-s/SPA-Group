import { useLoaderData } from "react-router-dom";

export async function getTodo({ params }) {
  const response = await fetch(`http://localhost:3001/todo/${params.todoId}`);
  return await response.json();
}

export default function SingleTodo() {
  const todo = useLoaderData();

  return (
    <div key={todo.id} id="singleTodo">
          <p>{todo.description}</p>
          <p>Completed: {todo.completed}</p>
          <p>Todo id: {todo.id}</p>
    </div>
  );
}
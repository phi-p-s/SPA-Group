import {Link, useLoaderData} from 'react-router-dom';


export default function Todos() {
  const { todos } = useLoaderData();

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id}>
          <Link to={`${todo.id}`}><h1>{todo.description}</h1></Link>
          <p>{todo.description}</p>
          <p>Completed: {String(todo.completed)}</p>
          <input type="checkbox" readOnly={true} checked={todo.completed} />
        </div>
      ))}
    </>
  );
}

async function fetchTodos() {
  const response = await fetch(`http://localhost:3001/stores`);
  return await response.json();
}

export { fetchTodos };
import { useLoaderData } from "react-router-dom";

export async function getStore({ params }) {
  const response = await fetch(`http://localhost:3001/store/${params.storeId}`);
  return await response.json();
}

export default function Singlestore() {
  const store = useLoaderData();

  return (
    <div key={store.id} id="singlestore">
          <p>{store.description}</p>
          <p>Completed: {store.completed}</p>
          <p>store id: {store.id}</p>
    </div>
  );
}
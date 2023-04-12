import {Link, useLoaderData} from 'react-router-dom';


export default function Stores() {
  const { stores } = useLoaderData();

  return (
    <>
      {stores.map((store) => (
        <div key={store.id}>
          <Link to={`${store.id}`}><h1>{store.description}</h1></Link>
          <p>{store.description}</p>
          <p>Completed: {String(store.completed)}</p>
          <input type="checkbox" readOnly={true} checked={store.completed} />
        </div>
      ))}
    </>
  );
}

async function fetchStores() {
  const response = await fetch(`http://localhost:3001/stores`);
  return await response.json();
}

export { fetchStores };
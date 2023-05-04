import {Link, useLoaderData} from 'react-router-dom';


export default function Stores() {
  var stores = [];
  stores = useLoaderData();
  return (
    <>
      {stores.map((store) => (
        <div key={store.id}>
          <Link to={`${store.id}`}><h1>{store.name}</h1></Link>
        </div>
      ))}
    </>
  );
}

async function fetchStores() {
  const response = await fetch(`http://localhost:3001/stores`);
  let retVal = response.json();
  return retVal;
}

export { fetchStores };
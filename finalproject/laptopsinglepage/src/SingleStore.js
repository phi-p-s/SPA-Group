import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';


export async function getStore({ params }) {
  const response = await fetch(`http://localhost:3001/stores/${params.store_id}`);
  let retVal = await response.json();
  console.log(retVal)
  return retVal[0];
}





export default function Singlestore() {
  const store = useLoaderData();
  console.log(store.store_id)


  return (
    <div key={store.id} id="singlestore">
          <h1>Store name: {store.name}</h1>
          <a href={'/stores/' + store.id +'/items/new'}>Create new item</a>
    </div>
  );
}


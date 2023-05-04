import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';


export async function getItem({ params }) {

  const response = await fetch(`http://localhost:3001/stores/${params.store_id}/items/${params.item_id}`);
  let retVal = await response.json();
  console.log(retVal)
  return retVal[0];
}





export default function SingleItem() {
  const item = useLoaderData();
  console.log(item.item_id)

  return (
    <div key={item.id} id="singlestore">
          <h1>Item name: {item.name}</h1>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
    </div>
  );
}


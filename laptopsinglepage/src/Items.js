import {Link, useLoaderData} from 'react-router-dom';


export default function Items() {
  var items = [];
  items = useLoaderData();
 
  return (
    <>
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`${item.id}`}><h1>{item.name}</h1></Link>
          <p>Item id: {item.id}</p>
        </div>
      ))}
    </>
  );
}

export async function getItems({params}) {
    console.log("get items ran");
    const response = await fetch(`http://localhost:3001/stores/${params.store_id}/items`);
    let retVal = await response.json();
    console.log("items list");
    console.log(retVal);
    return retVal;
  }


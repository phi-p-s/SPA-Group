import {Link, useLoaderData} from 'react-router-dom';


export default function Items() {
  var grabValue = [];
  grabValue = useLoaderData();
  var items = [];
  items = grabValue.retVal;
  var store_id = grabValue.store_id;
  var store_name = grabValue.store_name;
  return (
    <>
      <h1>{store_name}</h1>
      <a href={'/stores/' + store_id +'/items/new'}>Create new item</a>
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`${item.id}`}><p>{item.name}</p></Link>
        </div>
      ))}
    </>
  );
}

export async function getItems({params}) {
    console.log("get items ran");
    const response = await fetch(`http://localhost:3001/stores/${params.store_id}/items`);
    const store_name_response = await fetch(`http://localhost:3001/stores/${params.store_id}`);
    let storeVal = await store_name_response.json();
    let retVal = await response.json();
    console.log("items list");
    console.log(storeVal[0].name);
    let returnValue = 
    {'store_id': params.store_id,
      'store_name': storeVal[0].name,
      'retVal': retVal};
    console.log(returnValue)
    return returnValue;
  }


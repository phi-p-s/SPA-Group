import {Link, useLoaderData} from 'react-router-dom';


export default function Decks() {
  var decks = [];
  decks = useLoaderData();
  return (
    <>
      {decks.map((store) => (
        <div key={store.id}>
          <Link to={`${store.id}`}><h1>{store.name}</h1></Link>
        </div>
      ))}
    </>
  );
}

async function fetchDecks() {
  const response = await fetch(`http://localhost:3001/decks`);
  let retVal = response.json();
  return retVal;
}

export { fetchDecks };
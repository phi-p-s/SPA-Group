import {Link, useLoaderData} from 'react-router-dom';


export default function Decks() {
  var decks = [];
  decks = useLoaderData();
  return (
    <>
      {decks.map((deck) => (
        <div key={deck.id}>
          <Link to={`${deck.id}`}><h1>{deck.name}</h1></Link>
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
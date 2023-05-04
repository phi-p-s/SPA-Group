import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';


export async function getDeck({ params }) {
  const response = await fetch(`http://localhost:3001/decks/${params.deck_id}`);
  let retVal = await response.json();
  console.log(retVal)
  return retVal[0];
}





export default function SingleDeck() {
  const deck = useLoaderData();
  console.log(deck.deck_id)


  return (
    <div key={deck.id} id="singledeck">
          <h1>Deck name: {deck.name}</h1>
          <a href={'/decks/' + deck.id +'/cards/new'}>Create new card</a>
    </div>
  );
}


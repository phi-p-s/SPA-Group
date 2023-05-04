import { useLoaderData } from "react-router-dom";
import { Link, Outlet } from 'react-router-dom';


export async function getCard({ params }) {
  const response = await fetch(`http://localhost:3001/decks/${params.deck_id}/cards/${params.card_id}`);
  let retVal = await response.json();
  console.log(retVal)
  return retVal[0];
}

export default function SingleCard() {
  const card = useLoaderData();
  return (
    <div key={card.id} id="singlecard">
      <h1>Card name: {card.name}</h1>
      <p>Quantity: {card.quantity}</p>
      <img src={card.image_uri} id = "img" />
    </div>
  );
}


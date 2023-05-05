import {Link, useLoaderData} from 'react-router-dom';
import "./App.css"

export default function Cards() {
  var grabValue = [];
  grabValue = useLoaderData();
  console.log(grabValue)
  var cards = [];
  cards = grabValue.retVal;
  var deck_id = grabValue.deck_id;
  var deck_name = grabValue.deck_name;
  let totalQuantity = 0;
  cards.map((card) => (totalQuantity = totalQuantity + Number(card.quantity)));
  return (
    <>
      <h1>{deck_name}</h1>
      <a href={'/decks/' + deck_id +'/cards/new'}>Create new card</a>
      <p>Deck Size: {totalQuantity}</p>
      <button onClick = {(event) => deleteDeck(deck_id)}>Delete Deck</button>
      <div className='magiccards'>
        {cards.map((card) => (
          <div key={card.id} className='card'>
            <h1>{card.name}</h1>
            <p>Quantity: {card.quantity} </p>
            <img src ={card.image_uri} />
            <br></br>
            <button onClick = {(event) => deleteCard(deck_id, card.id) }>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

async function deleteCard(deck_id, card_id) {
  fetch(`http://localhost:3001/decks/${deck_id}/cards/${card_id}`, {
            method: 'DELETE'
  });
  window.location.reload(false);
}

async function deleteDeck(deck_id) {
  fetch(`http://localhost:3001/decks/${deck_id}`, {
            method: 'DELETE'
  });
  window.location.replace('http://localhost:3000/decks')
}
export async function getCards({params}) {
    console.log(params.deck_id);
    const response = await fetch(`http://localhost:3001/decks/${params.deck_id}/cards`);
    const deck_name_response = await fetch(`http://localhost:3001/decks/${params.deck_id}`);
    let deckVal = await deck_name_response.json();
    let retVal = await response.json();
    console.log(retVal)
    console.log(deckVal[0].name);
    let returnValue = 
    {'deck_id': params.deck_id,
      'deck_name': deckVal[0].name,
      'retVal': retVal};
    console.log(returnValue)
    return returnValue;
  }


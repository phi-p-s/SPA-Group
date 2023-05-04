import {Link, useLoaderData} from 'react-router-dom';


export default function Cards() {
  var grabValue = [];
  grabValue = useLoaderData();
  console.log(grabValue)
  var cards = [];
  cards = grabValue.retVal;
  console.log('where card')
  console.log(cards)
  var deck_id = grabValue.deck_id;
  var deck_name = grabValue.deck_name;
  return (
    <>
      <h1>{deck_name}</h1>
      <a href={'/decks/' + deck_id +'/cards/new'}>Create new card</a>
      {cards.map((card) => (
        <div key={card.id}>
          <Link to={`cards/${card.id}`}><p>Quantity: {card.quantity} {card.name}</p></Link>
        </div>
      ))}
    </>
  );
}

export async function getCards({params}) {
    console.log(params.deck_id);
    const response = await fetch(`http://localhost:3001/decks/${params.deck_id}/cards`);
    console.log("error here?")
    const deck_name_response = await fetch(`http://localhost:3001/decks/${params.deck_id}`);
    let deckVal = await deck_name_response.json();
    let retVal = await response.json();
    console.log("cards list");
    console.log(retVal)
    console.log(deckVal[0].name);
    let returnValue = 
    {'deck_id': params.deck_id,
      'deck_name': deckVal[0].name,
      'retVal': retVal};
    console.log(returnValue)
    return returnValue;
  }


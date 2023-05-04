import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './deck.css';




export default function NewCard() {

    const [inputName, setName] = useState('');
    const [inputQuantity, setQuantity] = useState('');
    const [inputPrice, setPrice] = useState('');

    const deck = useLoaderData();


    async function createNewCardSubmission(event) {

        event.preventDefault();
    
        const newDeckObject = {
            name: inputName,
            quantity: inputQuantity,
            price: inputPrice,
            deck_id: deck.id
        };
        console.log(newDeckObject);
    
        await fetch(`http://localhost:3001/decks/${deck.id}/cards`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newDeckObject)
        });
        console.log("poo");
    }

  return (
    <div id="createNewDeck">
        <h1>Create New card</h1>
        <form onSubmit={(event) => createNewCardSubmission(event)}>
            <br></br>
            <p>Card Name</p>
                <input type="text" value={inputName} onChange = {(event) => setName(event.target.value)}/> 
                <button type= "submit">Update Card</button>
                <br></br>
                <p>Quantity</p>
                <input type="text" value={inputQuantity} onChange = {(event) =>  setQuantity(event.target.value)}/> 
                {/* <button type= "submit">Update Quantity</button> */}
                <br></br>
                <p>Price</p>
                <input type="text" value={inputPrice} onChange = {(event) =>  setPrice(event.target.value)}/> 
                {/* <button type= "submit">Update Price</button> */}
        </form>
    </div>
    
  );
}

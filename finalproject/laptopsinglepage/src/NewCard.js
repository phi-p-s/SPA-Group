import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './deck.css';




export default function NewCard() {

    const [inputName, setName] = useState('');
    const [inputQuantity, setQuantity] = useState('');
    const [inputPrice, setPrice] = useState('');

    const deck = useLoaderData();

    async function fetchPostCard(img_uri, cardType, displayName, displayQuantity) {
        const newCardObject = {
            name: displayName,
            quantity: displayQuantity,
            deck_id: deck.id,
            image_uri: img_uri,
            card_type: cardType
        };
        console.log(newCardObject);
        fetch(`http://localhost:3001/decks/${deck.id}/cards`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newCardObject)
        });
    }

    function capitalize(string){
        let arr = string.split(" ")
        for(var i = 0; i < arr.length; i++){
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
        }
        return arr.join(" ")
    }

    async function createNewCardSubmission(event) {

        event.preventDefault();
        
        const cardName = inputName.toLowerCase();
        const displayName = capitalize(inputName)
        let cardType = null;
        let img_uri = null;
        fetch(`https://api.scryfall.com/cards/named?fuzzy=${cardName}`)
        .then((body) => body.json())
        .then((json) => {
            console.log(json);
            cardType = json.type_line.split(" ");
            img_uri = json.image_uris.small;
            console.log(cardType);
            console.log(img_uri)
            //ALL THE RULES:
            //No tokens
            //Cannot add more than 4 of any card
            //No limit on basic lands
            if (cardType[0].toLowerCase() != "token"){
                let displayQuantity = inputQuantity;
                if (cardType[0].toLowerCase() != "basic" && inputQuantity > 4){
                    console.log("waddup")
                    displayQuantity = 4;
                }
                fetchPostCard(img_uri, cardType, displayName, displayQuantity)
            }
        });
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
        </form>
    </div>
    
  );
}

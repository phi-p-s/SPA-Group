import { useState } from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import './deck.css';


export default function NewDeck() {
    const [inputName, setDescription] = useState('');

    async function createNewDeckSubmission(event) {
        event.preventDefault();
        
    
        const newDeckObject = {
            name: inputName,
        };
    
        console.log(newDeckObject);

        await fetch(`http://localhost:3001/decks`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newDeckObject)
        });
    
    }

  return (
    <div id="createNewDeck">
        <h1>Create New Decks</h1>
        <form onSubmit={(event) => createNewDeckSubmission(event)}>
            <br></br>
                <input type="text" value={inputName} onChange = {(event) => setDescription(event.target.value)}/> 
                <button type= "submit">Update Decks</button>
        </form>
    </div>
    
  );
}



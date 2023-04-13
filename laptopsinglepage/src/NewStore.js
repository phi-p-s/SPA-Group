import { useState } from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import './store.css';


export default function NewStore() {
    const [inputName, setDescription] = useState('');

    async function createNewStoreSubmission(event) {
        event.preventDefault();
        
    
        const newStoreObject = {
            name: inputName,
        };
    
        console.log(newStoreObject);

        await fetch(`http://localhost:3001/stores`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newStoreObject)
        });
    
    }

  return (
    <div id="createNewStore">
        <h1>Create New Stores</h1>
        <form onSubmit={(event) => createNewStoreSubmission(event)}>
            <br></br>
                <input type="text" value={inputName} onChange = {(event) => setDescription(event.target.value)}/> 
                <button type= "submit">Update Stores</button>
        </form>
    </div>
    
  );
}



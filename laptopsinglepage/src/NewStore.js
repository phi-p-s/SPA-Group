import { useState } from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import './store.css';


export default function NewStore() {
    const [inputDescription, setDescription] = useState('');
    const [ischecked, setChecked] = useState(false);

    async function createNewStoreSubmission(event) {
        event.preventDefault();
        
    
        const newStoreObject = {
            description: inputDescription,
            completed: ischecked
        };
    
    
        await fetch(`http://localhost:3001/store`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newStoreObject)
    
        });
    
    }

  return (
    <div id="createNewStore">
        <h1>Create New Stores</h1>
        <form onSubmit={(event) => createNewStoreSubmission(event)}>
            <label>
            Completed:
            <input name="completed" type="checkbox" onChange = {(event) => setChecked(event.target.value)}/>
            </label>
            <br></br>
                <input type="text" value={inputDescription} onChange = {(event) => setDescription(event.target.value)}/> 
                <button type= "submit"> update stores</button>
        </form>
    </div>
    
  );
}



import { useState } from 'react';
import {Link, useLoaderData} from 'react-router-dom';
import './todo.css';


export default function NewTodo() {
    const [inputDescription, setDescription] = useState('');
    const [ischecked, setChecked] = useState(false);

    async function createNewTodoSubmission(event) {
        event.preventDefault();
        
    
        const newTodoObject = {
            description: inputDescription,
            completed: ischecked
        };
    
    
        await fetch(`http://localhost:3001/todo`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newTodoObject)
    
        });
    
    }

  return (
    <div id="createNewTodo">
        <h1>Create New Todos</h1>
        <form onSubmit={(event) => createNewTodoSubmission(event)}>
            <label>
            Completed:
            <input name="completed" type="checkbox" onChange = {(event) => setChecked(event.target.value)}/>
            </label>
            <br></br>
                <input type="text" value={inputDescription} onChange = {(event) => setDescription(event.target.value)}/> 
                <button type= "submit"> update todos</button>
        </form>
    </div>
    
  );
}



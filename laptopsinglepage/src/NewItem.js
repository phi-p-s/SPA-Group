import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import './store.css';




export default function NewItem() {
    const [state, setState] = useState({
        name:"",
        quantity: "",
        price: ""

    });
    const [inputName, setName] = useState('');
    const [inputQuantity, setQuantity] = useState('');
    const [inputPrice, setPrice] = useState('');

    const store = useLoaderData();


    async function createNewItemSubmission(event) {

        event.preventDefault();
    
        const newStoreObject = {
            name: state.name,
            quantity: state.quantity,
            price: state.price,
            store_id: store.id
        };
    
    
        await fetch(`http://localhost:3001/stores/${store.id}/items`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newStoreObject)
        });
    
    }

  return (
    <div id="createNewStore">
        <h1>Create New Item</h1>
        <form onSubmit={(event) => createNewItemSubmission(event)}>
            <br></br>
            <p>Item Name</p>
                <input type="text" value={state.name} onChange = {(event) => setState(event.target.value)}/> 
                <button type= "submit">Update Item</button>
                <br></br>
                <p>Quantity</p>
                <input type="text" value={state.quantity} onChange = {(event) => setState(event.target.value)}/> 
                {/* <button type= "submit">Update Quantity</button> */}
                <br></br>
                <p>Price</p>
                <input type="text" value={state.price} onChange = {(event) => setState(event.target.value)}/> 
                {/* <button type= "submit">Update Price</button> */}
        </form>
    </div>
    
  );
}

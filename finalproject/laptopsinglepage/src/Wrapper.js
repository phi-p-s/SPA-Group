import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

export default function Wrapper() {
  return (
    <>
      {/* <div className="App"> */}
      <div>
        {/* <header className="App-header"> */}
        <header>
          <h1>MTG Deck Builder</h1>
          <Link to ="/decks">View decks</Link>
          <br></br>
          <Link to="/decks/new">Create a new deck</Link>
        </header>
        <hr />
        <Outlet/>
      </div>
    </>
  );
}
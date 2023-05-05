import logo from './logo.svg';
import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {








  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>MTG Deck Builder</h1>
          <Link to ="/decks">View decks</Link>
        </header>
        <hr />
        <Outlet/>
      </div>
    </>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wrapper from './Wrapper';
import Decks, { fetchDecks } from './decks';
import SingleDeck,{ getDeck } from './SingleDeck';
import Cards, { getCards } from './Cards';
import NewDeck, { postDeck } from './NewDeck';
import NewCard, { postCard } from './NewCard';
import SingleCard, {getCard} from './SingleCard';
// import { fetchDecks } from './decks';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/decks",
        loader: fetchDecks,
        element: <Decks />,
      },
      {
        path: "/decks/:deck_id/cards",
        loader: getDeck,
        element: (
            <SingleDeck />
        ),
      },
      {
        path: "/decks/new",
        element: (
            <NewDeck />
        ),
      },
      {
        path: "/decks/:deck_id/",
        loader: getCards,
        element: (
            <Cards />
        ),
      },
      {
        path: "/decks/:deck_id/cards/:card_id",
        loader: getCard,
        element: (
          <SingleCard />
        )
      },
      {
          path: "/decks/:deck_id/cards/new",
          loader: getDeck,
          element: (
              <NewCard />
          ),
      },
    ],
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

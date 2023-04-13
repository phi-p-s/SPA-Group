import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Wrapper from './Wrapper';
import Stores, { fetchStores } from './Stores';
import SingleStore,{ getStore } from './SingleStore';
import Items, { getItems } from './Items';
import NewStore, { postStore } from './NewStore';
import NewItem, { postItem } from './NewItem';
import SingleItem, {getItem} from './SingleItem';



const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    children: [
      {
        path: "/stores",
        loader: fetchStores,
        element: <Stores />,
      },
      {
        path: "/stores/:store_id",
        loader: getStore,
        element: (
            <SingleStore />
        ),
      },
      {
        path: "/stores/new",
        element: (
            <NewStore />
        ),
      },
      {
        path: "/stores/:store_id/items",
        loader: getItems,
        element: (
            <Items />
        ),
      },
      {
        path: "/stores/:store_id/items/:item_id",
        loader: getItem,
        element: (
          <SingleItem />
        )
      },
      {
          path: "/stores/:store_id/items/new",
          loader: getStore,
          element: (
              <NewItem />
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

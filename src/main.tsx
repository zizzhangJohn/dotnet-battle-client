import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './Routes/LoginPage';
import CharactersPage from './Routes/CharactersPage';
import FightPage from './Routes/FightPage';
import Error from './Routes/ErrorPage';
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
        errorElement: <Error />,
      },
      {
        path: "fight",
        element: <FightPage />,
        errorElement: <Error />,
      },
      {
        path: "characters",
        element: <CharactersPage />,
        errorElement: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

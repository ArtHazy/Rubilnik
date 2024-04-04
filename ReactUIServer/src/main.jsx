import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './nav_app/App.jsx'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Play from './nav_play/Play.jsx';
import { ViewLogin } from './nav_authorizaztion/ViewLogin.jsx';
import { ViewRegister } from './nav_authorizaztion/ViewRegister.jsx';
import { ViewJoin } from './nav_app/ViewJoin.jsx';


export const SERVER_URL = "http://127.0.0.1:3000"
/**
 * 
 * @param {()=>React.JSX.Element} jsxElement 
 * @param {string} name 
 * @returns 
 */


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/play/:roomId",
    element: <Play />,
  },
  {
    path: "/login",
    element: <ViewLogin />,
  },
  {
    path: "/register",
    element: <ViewRegister />,
  },
  {
    path: "/join",
    element: <ViewJoin />,
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './nav_app/App.jsx'
import './index.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {Play} from './nav_play/Play.jsx';
import { ViewLogin } from './nav_authorizaztion/ViewLogin.jsx';
import { ViewRegister } from './nav_authorizaztion/ViewRegister.jsx';
import { ViewJoin } from './nav_app/ViewJoin.jsx';
import { ViewEditQuiz } from './nav_app/ViewEditQuiz.jsx';

// import {config} from 'dotenv'
// config()
// config()
// export const serverUrl = process.env.REACT_APP_SERVER_URL

export const SERVER_URL = "http://192.168.249.51:3000"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/edit-quiz",
    element: <ViewEditQuiz/>,
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

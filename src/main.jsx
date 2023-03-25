import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from "react-redux";
import Store from './app/Store.js';
import { Toaster } from 'react-hot-toast';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/routes/root';

const router = createBrowserRouter([
  {
    path: "/",
    element:<Provider store={Store}>
    <Toaster position='top-center' reverseOrder={false} />
      <App/>
    </Provider>,
    
  },
  {
    path: "/user",
    element: <Root />,
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
    
  </React.StrictMode>
)

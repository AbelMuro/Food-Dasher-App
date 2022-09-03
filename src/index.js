//initializing REACT.....
import React from "react";
import ReactDOM from "react-dom/client";

//initializing redux with REACT
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import OrderReducer from './reducers/OrderReducer.js';

//importing the actual app
import App from './components/App';


//creating the store
let store = configureStore({
    reducer: OrderReducer
});  

//rendering the app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <Provider store={store}>
            <App/>
        </Provider> 
);

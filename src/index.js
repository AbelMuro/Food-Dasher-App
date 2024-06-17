//initializing REACT
import React from "react";
import ReactDOM from "react-dom/client";

//initializing redux
import {Provider} from 'react-redux';
import store, {persistedStore} from './store';
import {PersistGate} from 'redux-persist/integration/react'

//importing the actual app
import App from './components/App';

//rendering the app to the DOM
const rootRef = document.getElementById("root")
const root = ReactDOM.createRoot(rootRef);
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistedStore}>
            <App/>                
        </PersistGate>
    </Provider>       
);

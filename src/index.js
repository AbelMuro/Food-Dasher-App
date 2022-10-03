//initializing REACT.....
import React, {useState} from "react";
import ReactDOM from "react-dom/client";

//initializing redux
import {Provider} from 'react-redux';
import store from './store';

//importing the actual app
import App from './components/App';

<<<<<<< HEAD
=======



>>>>>>> 627ebcc4905acd36b1c2260f37c7024fba848f22

//rendering the app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<<<<<<< HEAD
    <>
        <Provider store={store}>
            <App/>
        </Provider>       
    </>

=======
 
        <Provider store={store}>
            <App/>
        </Provider> 
>>>>>>> 627ebcc4905acd36b1c2260f37c7024fba848f22
);

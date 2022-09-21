//initializing REACT.....
import React from "react";
import ReactDOM from "react-dom/client";

//initializing redux
import {Provider} from 'react-redux';
import store from './store';

//importing the actual app
import App from './components/App';


//trying to configure webpack to take a proxy
function Login() {
    return(
        <form action="login">
            <label htmlfor="username">
                Username: 
            </label>
            <input type="text" id="username" name="username" value="" required/>
            <label htmlfor="password">
                Password: 
            </label>
            <input type="password" id="password" name="password" value="" required/>
            <input type="submit"/>
        </form>
    )
}



//rendering the app to the DOM
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
        <Provider store={store}>
            <App/>
            <Login/>
        </Provider> 
);

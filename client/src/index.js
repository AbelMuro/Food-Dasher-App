//initializing REACT.....
import React, {useState} from "react";
import ReactDOM from "react-dom/client";

//initializing redux
import {Provider} from 'react-redux';
import store from './store';

//importing the actual app
import App from './components/App';


function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    let disable = password.length < 6 || userName.length == 0;
  
    const handleLogin = () => {
        fetch('/getData', {
            method: "GET",
            body: JSON.stringify({example : "this should work"}), 
            headers: {
                "Content-Type" : 'application/json'
            },
        }).then(response => { return response.text()})
        .then(data => {console.log(data)});
    }
        


    return(
        <>
            <form action="login" method="POST">
                <label htmlFor="username">
                    Username: 
                </label>
                <input type="text" id="username" name="username" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                <label htmlFor="password">
                    Password: 
                </label>
                <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <input disabled={disable} type="submit" value="Login"/>
            
            </form> 
            <button onClick={handleLogin}>fetch</button>       
        </>

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

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
        document.cookie= "username=John doe; path=/";
        document.cookie= "password=cobra69";
        document.cookie= "username=hotStuff69";
        sessionStorage.setItem("key", "value");
        sessionStorage.getItem("key")
        sessionStorage.clickcount = 1;
        
        fetch('/setCookie',{
            method: "POST",
            credentials: "include",             //used mostly for cookies
        })
            .then(response => { return response.json()})
            .then(data => data);
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

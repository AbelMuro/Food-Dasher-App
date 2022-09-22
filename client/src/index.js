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
    const [loading, setLoading] = useState(false)
    
    let disable = password.length < 6 || userName.length == 0 || loading;
  
    //trying to post cutoms data to the server
    const handleLogin = () => {
        //setLoading(true);
        fetch('/login', {
            method: "POST",
            body: JSON.stringify({example : "this should work"}),       //JSON.stringify(data)
            headers: {
                "Content-Type" : 'application/json'
            },
        }).then(response => {console.log(response.text())});


        //setLoading(false)
    }
        


    return(
        <form>
            <label htmlFor="username">
                Username: 
            </label>
            <input type="text" id="username" name="username" value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
            <label htmlFor="password">
                Password: 
            </label>
            <input type="password" id="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <input disabled={disable} type="submit" value="Login" onClick={handleLogin}/>
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

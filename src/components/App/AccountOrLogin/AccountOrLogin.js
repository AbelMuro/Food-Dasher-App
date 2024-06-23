import React, {useState, useEffect} from 'react';
import Login from './Login';
import {auth} from '~/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import Account from './Account';

// now i need to find a way to let the user log in again if they want to delete their account
function AccountOrLogin() {
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
        if(user)
            setLoggedIn(true);
        else
            setLoggedIn(false);
    })

    useEffect(() => {
        console.log(loggedIn)
    }, [loggedIn])

    return loggedIn ? <Account/> : <Login/>
    
}

export default AccountOrLogin;
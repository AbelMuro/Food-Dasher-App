import React, {useState, useEffect} from 'react';
import Login from './Login';
import {auth} from '~/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import Account from './Account';

function AccountOrLogin() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user)
                setLoggedIn(true);
            else
                setLoggedIn(false);
        })
    }, [])

    return loggedIn ? <Account setLoggedIn={setLoggedIn}/> : <Login setLoggedIn={setLoggedIn}/>
    
}

export default AccountOrLogin;
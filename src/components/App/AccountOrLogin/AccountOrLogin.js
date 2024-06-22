import React, {useState} from 'react';
import Login from './Login';
import {auth} from '~/firebase';
import {onAuthStateChanged} from 'firebase/auth';

//now i need to create the account component
// and i will need to redirect the form component in the register route to this component
function AccountOrLogin() {
    const [loggedIn, setLoggedIn] = useState(false);

    onAuthStateChanged(auth, (user) => {
        console.log(user);

        if(user)
            setLoggedIn(true);
        else
            setLoggedIn(false);
    })

    return false ? 
        <>
        </> : <Login/>
    
}

export default AccountOrLogin;
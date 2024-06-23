import React, {useState} from 'react';
import styles from './styles.module.css';
import {signOut} from 'firebase/auth';
import {CircularProgress} from '@mui/material';
import {auth} from '~/firebase';

function LogOut(){
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleLogOut = async() => {
        try{
            setLoading(true)
            await signOut(auth);            
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false)
        }

    }

    return(
        <>
            <button className={styles.account_button} onClick={handleOpen}>
                Log Out
            </button>       
            {open && <div className={styles.overlay}>
                <dialog className={styles.dialog} open={open}>
                    <h1>
                        Log out?
                    </h1>
                    <button type='button' onClick={handleLogOut}>
                        {loading ? <CircularProgress sx={{color: 'white'}} size='1.5rem'/> : 'Log out'}
                    </button>
                    <button type='button' onClick={handleOpen}>
                        Cancel
                    </button>
                </dialog>                
            </div>}
        </>
    )
}

export default LogOut;
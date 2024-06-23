import React, {useState} from 'react';
import EnterZip from './EnterZip';
import EnterEmail from './EnterEmail';
import {db} from '~/firebase'
import {doc, updateDoc} from 'firebase/firestore';
import styles from './styles.module.css';
import { CircularProgress } from '@mui/material';

function UpdateAccount({phoneNumber}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleSubmit = async (e) => {  
        e.preventDefault();
        try{
            const email = e.target.elements.email.value;
            const zip = e.target.elements.zip.value;

            if(email && !email.match(/^[0-9A-Za-z%.+\-]+@[0-9A-Za-z%.+\-]+\.[A-Za-z]{2,4}$/)){
                alert('Enter a valid email');
                return;
            }

            if(zip && zip.length < 5){
                alert('Enter a valid Zip');
                return;
            }

            else if(!email && !zip){
                alert('you must update either email, zip, or both');
                return;
            }
            setLoading(true);

            const docRef = doc(db, `${phoneNumber}/userInfo`);
            await updateDoc(docRef, {
                ...(email && {email}),
                ...(zip && {zip})
            });
            setTimeout(() => {
                alert('Account has been updated');
            }, 500)

        } catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
            setOpen(false);
        }

    }


    return(
        <>
            <button className={styles.account_button} onClick={handleOpen}>
                Update Account
            </button>        
            {open && <div className={styles.overlay}>
                <dialog className={styles.dialog} open={open}>
                    <form className={styles.dialog_form} onSubmit={handleSubmit}>
                        <h1>
                            Update Account
                        </h1>
                        <EnterEmail/>
                        <EnterZip/>
                        <button>
                            {loading ? <CircularProgress sx={{color: 'white'}} size='1.5rem'/> : 'Update'}
                        </button>
                        <button type='button' onClick={handleOpen}>
                            Cancel
                        </button>
                    </form>
                </dialog>                
            </div>}
        </>
    )
}

export default UpdateAccount;
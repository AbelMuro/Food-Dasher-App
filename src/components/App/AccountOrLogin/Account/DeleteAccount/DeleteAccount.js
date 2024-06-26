import React, {useState} from 'react';
import styles from './styles.module.css';
import {ref, deleteObject, listAll} from 'firebase/storage'
import {db, auth, storage} from '~/firebase';
import {doc, deleteDoc} from 'firebase/firestore';
import {deleteUser} from 'firebase/auth';
import {CircularProgress} from '@mui/material';


function DeleteAccount({phoneNumber, setLoggedIn}) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    const handleDelete = async () => {
        setLoading(true);
        try{
            await deleteUser(auth.currentUser);

            const docRef = doc(db, `${phoneNumber}/userInfo`);
            await deleteDoc(docRef);

            const imagesRef = ref(storage, `${phoneNumber}`);
            const results = await listAll(imagesRef);
            results.items.forEach((ref) => {
                deleteObject(ref);
            })
            setOpen(false);
            setLoading(false);                    
            setTimeout(() => {
                alert('Account has been deleted')
            }, 300)
        }
        catch(error){
            if(error.code === 'auth/requires-recent-login'){
                alert('Deleting your account requires a recent log in, please log in again')
                setLoggedIn(false);                
            }         
        }
    }

    return(
        <>
            <button className={styles.button} onClick={handleOpen}>
                Delete Account
            </button>     
            {open && <div className={styles.overlay}>
                <dialog className={styles.dialog} open={open}>
                        <h1>
                            Are you sure you want to delete your account?
                        </h1>
                        <h2>
                            This action is irreversable
                        </h2>
                        <button type='button' onClick={handleDelete}>
                            {loading ? <CircularProgress sx={{color: 'white'}} size='1.5rem'/> : 'Yes'}
                        </button>
                        <button type='button' onClick={handleOpen}>
                            Cancel
                        </button>
                </dialog>                
            </div>}   
        </>

    )
}

export default DeleteAccount;
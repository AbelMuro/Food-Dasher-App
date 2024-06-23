import React, {useState} from 'react';
import SelectImage from './SelectImage';
import styles from './styles.module.css';
import { CircularProgress } from '@mui/material';
import {db, storage} from '~/firebase';
import {updateDoc, doc} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

function UploadImage({phoneNumber}) {
    const [open, setOpen] = useState();
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const image = e.target.elements.image.files[0];     

        try{
            setLoading(true);
            const fileRef = ref(storage, `${phoneNumber}/${image.name}`)
            await uploadBytes(fileRef, image);
            const imageURL = await getDownloadURL(fileRef);
            const docRef = doc(db, `${phoneNumber}/userInfo`)
            await updateDoc(docRef, {
                image: imageURL
            });        
            setTimeout(() => {
                alert('Image has been uploaded')
            }, 500)
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
            setOpen(false)
        }
    }   


    return(
        <>
            <button className={styles.account_button} onClick={handleOpen}>
                Upload Image
            </button>                 
            {open && 
            <div className={styles.overlay}>
                <dialog className={styles.dialog} open={open}>
                    <form className={styles.dialog_form} onSubmit={handleSubmit}>
                        <h1>
                            Upload Image
                        </h1>
                        <SelectImage/>
                        <button>
                            {loading ? <CircularProgress sx={{color: 'white'}} size='1.5rem'/> : 'Upload'}
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

export default UploadImage;
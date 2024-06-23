import React, {useState, useEffect} from 'react';
import UpdateAccount from './UpdateAccount';
import UploadImage from './UploadImage';
import DeleteAccount from './DeleteAccount';
import LogOut from './LogOut';
import styles from './styles.module.css';
import {db, auth} from '~/firebase';
import {doc, onSnapshot} from 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import images from './images';
import { useNavigate } from 'react-router-dom';

function Account({setLoggedIn}) {
    const [user] = useAuthState(auth);
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    const handleOrders = () => {
        navigate('/DisplayAllOrders');
    }


    useEffect(() => {
        if(!user) 
            return;
        const phoneNumber = user.phoneNumber;
        const docRef = doc(db, `${phoneNumber}/userInfo`);
        const unsubscribe = onSnapshot(docRef,  (doc) => {
            setData(doc.data())
        })
    
        return unsubscribe;
    }, [user])

    return(
        <section className={styles.container}>
            {
                data && 
                <div className={styles.account}>
                    <img className={styles.account_image} src={data.image ? data.image : images['emptyAvatar'] }/>
                    <p className={styles.account_detail}>
                        <span>
                            Email:
                        </span>
                        {data.email}
                    </p>
                    <p className={styles.account_detail}>
                        <span>
                            Phone:
                        </span>
                        {data.phone}
                    </p>
                    <p className={styles.account_detail}>
                        <span>
                            ZIP:
                        </span>
                        {data.zip}
                    </p>
                    <button className={styles.account_button} onClick={handleOrders}>
                        Display All Orders
                    </button>
                    <UpdateAccount phoneNumber={data.phone}/>
                    <UploadImage phoneNumber={data.phone}/>
                    <LogOut/>
                    <DeleteAccount phoneNumber={data.phone} setLoggedIn={setLoggedIn}/>
                </div>
            }

        </section>
    )
}

export default Account;
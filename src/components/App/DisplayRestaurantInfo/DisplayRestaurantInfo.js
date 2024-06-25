import React, {useEffect, useState, lazy} from 'react';
const Item = lazy(() => import('./Item'))
import {useLocation} from 'react-router-dom';
import {collection, query, orderBy} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'; 
import {db} from '~/firebase';
import styles from './styles.module.css';

function DisplayRestaurantInfo() {
    const {state} = useLocation();                              //state is a string that has the name of the restaurant
    const restaurantName = state.restaurantName;
    const usersLocation = state.usersLocation;
    const restaurantLocation = state.restaurantLocation;
    const collectionRef = collection(db, restaurantName);
    const q = query(collectionRef, orderBy('order'));
    const [documents, loading, error] = useCollection(q);
    const [items, setItems] = useState([]);
    const [logo, setLogo] = useState(null);

    useEffect(() => {
        if(!loading){
            const menu = [];
            documents.forEach((doc) => {
                if(doc.id === 'logo'){
                    const data = doc.data();
                    setLogo(
                        <>
                            <img className={styles.restaurantImage} src={data.url}/> 
                            <div className={styles.restaurantIntro}>
                                <p className={styles.restaurantInfo}> Work Hours: {"Open 24 Hours"}</p>
                                <p className={styles.restaurantDeliveryFee}> Delivery Fee: {"$5.00"}</p>
                            </div>                        
                        </>
                    )                    
                }
                else{
                    const data = doc.data();
                    menu.push(
                        <Item 
                            restaurantName={restaurantName} 
                            data={data} 
                            key={data.name} 
                            usersLocation={usersLocation} 
                            restaurantLocation={restaurantLocation}
                        />
                    )
                }
            }) 
            setItems(menu);           
        }

    }, [loading])


    return (
        <>
            {logo && logo}
            {items}
        </>
    )
}

export default DisplayRestaurantInfo;
import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {collection, query, orderBy} from 'firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore'; 
import {db} from '~/firebase';
import './styles.css';

function DisplayRestaurantInfo() {
    const {state} = useLocation();                              //state is a string that has the name of the restaurant
    const collectionRef = collection(db, state);
    const q = query(collectionRef, orderBy('order'));
    const [documents, loading, error] = useCollection(q);
    const [items, setItems] = useState([]);
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();

    const handleItem = (item) => {
        const itemTitle = item.name;
        navigate("/MenuItem", {state: {restaurantName: state, itemTitle: itemTitle}})
    }

    useEffect(() => {
        if(!loading){
            const menu = [];
            documents.forEach((doc) => {
                if(doc.id === 'logo'){
                    const data = doc.data();
                    setLogo(
                        <>
                            <img className="restaurantImage" src={data.url}/> 
                            <div className="restaurantIntro">
                                <p className="restaurantInfo"> Work Hours: {"Open 24 Hours"}</p>
                                <p className="restaurantDeliveryFee"> Delivery Fee: {"$5.00"}</p>
                            </div>                        
                        </>
                    )                    
                }
                else{
                    const data = doc.data();
                    menu.push(
                        <div className={"itemContainer"} key={doc.id}>
                            <img className={"itemImage"} src={data.image} />    
                            <div className={"itemTitle"}>{data.name}</div>
                            {data.ingredients && <div className={"itemIngredients"}>{data.ingredients.join(',')}</div>}
                            {data.sauce && <div className={"itemSauces"}>{data.sauce.join(',')}</div>}
                            <div className={"itemPrice"}>${data.price.toFixed(2)}</div>
                            <button className={"chooseItem"} onClick={() => handleItem(data)}>Select Item</button>
                        </div>  
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
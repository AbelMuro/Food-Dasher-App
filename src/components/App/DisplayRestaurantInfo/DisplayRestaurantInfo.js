import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {collection, query, orderBy} from 'firebase/firestore';
import {useCollectionData, useCollection} from 'react-firebase-hooks/firestore'; 
import {db} from '~/firebase';
import './styles.css';

function DisplayRestaurantInfo() {
    const {choosenRestaurant} = useParams();
    console.log(choosenRestaurant)
    const collectionRef = collection(db, choosenRestaurant);
    const q = query(collectionRef, orderBy('order'));
    const [documents, loading, error] = useCollection(q);
    const [items, setItems] = useState([]);
    const [logo, setLogo] = useState(null);
    const navigate = useNavigate();

    function handleChooseButton(item) {
        //storing the item Data as a string into the local Storage 
        const itemTitle = item.querySelector(".itemTitle").innerHTML;
        localStorage.setItem(itemTitle, item.outerHTML);

        //navigating to a different router
        navigate("/GoogleMap/" + choosenRestaurant + "/" + itemTitle)
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
                        <div className={"itemContainer"}>
                            <img className={"itemImage"} src={data.image} />    
                            <div className={"itemTitle"}>{data.name}</div>
                            {data.ingredients && <div className={"itemIngredients"}>{data.ingredients.join(',')}</div>}
                            {data.sauce && <div className={"itemSauces"}>{data.sauce.join(',')}</div>}
                            <div className={"itemPrice"}>${data.price.toFixed(2)}</div>
                            <button className={"chooseItem"}>Select Item</button>
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
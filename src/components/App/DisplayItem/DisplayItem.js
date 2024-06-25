import React, {useRef} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {doc} from 'firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore'; 
import {useDispatch} from 'react-redux';
import {v4 as uuid} from 'uuid';
import styles from './styles.module.css';
import {db} from '~/firebase'
import Quantity from './Quantity';

function DisplayItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const {state} = useLocation(); 
    const restaurantName = state.restaurantName;
    const itemTitle = state.itemTitle;       
    const usersLocation = state.usersLocation;
    const restaurantLocation = state.restaurantLocation;                      
    const docRef = doc(db, `${restaurantName}/${itemTitle}`);
    const [itemData, loading, error] = useDocumentData(docRef);
    const quantityRef = useRef();

    const getQuantity = (quantity) => {
        quantityRef.current = quantity;
    }

    const handleGoBackButton = () => {
        navigate(-1);
    }

    const handleAddToOrder = (e) => {
        e.preventDefault();
        dispatch({type: 'UPDATE_RESTAURANT', restaurant: state.restaurantName});
        dispatch({type: 'UPDATE_USERS_LOCATION', latlng: usersLocation});
        dispatch({type: 'UPDATE_RESTAURANT_LOCATION', latlng: restaurantLocation});
        const newItem = {}   
        let ingredients = e.target.elements.ingredients;
        newItem['excludedIngredients'] = [];
        if(ingredients && ingredients.length)
            ingredients.forEach((checkbox) => {
                if(checkbox.checked)
                    newItem['excludedIngredients'].push(checkbox.value);
            });
        else if(ingredients)
            newItem['excludeIngredients'] = ingredients.checked ? [ingredients.value] : [];

        let sauces = e.target.elements.sauces;
        newItem['sauces'] = [];
        if(sauces && sauces.length)
            sauces.forEach((checkbox) => {
                if(checkbox.checked)
                    newItem['sauces'].push(checkbox.value);
            });
        else if(sauces)
            newItem['sauces'] = sauces.checked ? [sauces.value] : [];
            
        newItem["image"] = itemData.image;
        newItem["name"] = itemData.name;
        newItem["quantity"] = quantityRef.current;
        newItem["price"] = itemData.price
        newItem["id"] = uuid();                    //generating a completely unique ID for each item

        dispatch({type: 'ADD_ITEM', item: newItem});
        dispatch({type: 'OPEN_CART'});
        navigate(-1);
    }
    
    const capitalizeString = (word) => {
        let w = word.split(' ');
        return w.map((word) => {
            return word[0].toUpperCase() + word.slice(1, word.length);
        }).join(' ');
    }


    return(
        <div className={styles.choosenItemContainer}>
            {!loading && 
            <div className={styles.choosenItem}>
                {itemData && <img className={styles.choosenItemImage} src={itemData.image}/>}
                <div className={styles.choosenItemTitle}>
                    {itemData && itemData.name}
                </div>
                <form className={styles.checkBoxes} onSubmit={handleAddToOrder}>
                    {(itemData && itemData.ingredients) && 
                        <div className={styles.noteToUser}>
                            Select Ingredients to exclude:
                        </div>}
                    {(itemData && itemData.sauce) && 
                        <div className={styles.noteToUser}>
                            Select Sauces:
                        </div>
                    }
                    {(itemData && itemData.ingredients) && 
                        itemData.ingredients.map((ingredient) => {
                            return(
                                <div key={ingredient}>
                                    <input type='checkbox' value={ingredient} className={styles.checkbox} name='ingredients'/>
                                    &nbsp;No {capitalizeString(ingredient)}
                                    <br/>
                                </div>
                            )
                        })
                    }
                    {(itemData && itemData.sauce) && 
                        itemData.sauce.map((sauce) => {
                            return(
                                <div key={sauce}>
                                    <input type='checkbox' value={sauce} className={styles.checkbox} name='sauces'/>
                                    &nbsp;{capitalizeString(sauce)}
                                    <br/>
                                </div>
                            )
                        })
                    }
                    {itemData && <Quantity getQuantity={getQuantity} price={itemData.price}/>} 
                    <div className={styles.buttonContainer}>
                        <button className={styles.addToOrderButton}>
                            Add to Order
                        </button>
                        <button type='button' className={styles.goBackButton} onClick={handleGoBackButton}>
                            Go Back
                        </button>                          
                    </div>    
                   
                </form>
            </div>}             
        </div>
    )
}

export default DisplayItem;
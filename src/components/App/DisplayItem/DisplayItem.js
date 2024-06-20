import React, {useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {doc} from 'firebase/firestore';
import {useDocumentData} from 'react-firebase-hooks/firestore'; 
import {useDispatch} from 'react-redux';
import {v4 as uuid} from 'uuid';
import './styles.css';
import {db} from '~/firebase'
import Quantity from './Quantity';

function DisplayItem() {
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const {choosenRestaurant, choosenItem} = useParams();                                
    const docRef = doc(db, `${choosenRestaurant}/${choosenItem}`);
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
        const newItem = {}   
        let ingredients = e.target.elements.ingredients;
        newItem['excludedIngredients'] = [];
        console.log(ingredients);

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
        <div className="choosenItemContainer">
            {!loading && 
            <div className='choosenItem'>
                {itemData && <img className='choosenItemImage' src={itemData.image}/>}
                <div className='choosenItemTitle'>
                    {itemData && itemData.name}
                </div>
                <form className='checkBoxes' onSubmit={handleAddToOrder}>
                    {(itemData && itemData.ingredients) && 
                        <div className='noteToUser'>
                            Select Ingredients to exclude:
                        </div>}
                    {(itemData && itemData.sauce) && 
                        <div className='noteToUser'>
                            Select Sauces:
                        </div>
                    }
                    {(itemData && itemData.ingredients) && 
                        itemData.ingredients.map((ingredient) => {
                            return(
                                <div key={ingredient}>
                                    <input type='checkbox' value={ingredient} className='checkbox' name='ingredients'/>
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
                                    <input type='checkbox' value={sauce} className='checkbox' name='sauces'/>
                                    &nbsp;{capitalizeString(sauce)}
                                    <br/>
                                </div>
                            )
                        })
                    }
                    {itemData && <Quantity getQuantity={getQuantity} price={itemData.price}/>}     
                    <button className="addToOrderButton">
                        Add to Order
                    </button>
                    <button type='button' className="goBackButton" onClick={handleGoBackButton}>
                        Go Back
                    </button>                     
                </form>
            </div>}             
        </div>
    )
}

export default DisplayItem;
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Quantity from './Quantity';
import './styles.css';

function DisplayItems() {
    const items = useSelector(state => state.cart.items);

    return(
        <section className='items-container'>
            {items.map((item) => {
                const image = item.image;
                const name = item.name;
                const excludedIngredients = item.excludedIngredients;
                const sauces = item.sauces;
                const price = item.price;
                const quantity = item.quantity;
                const id = item.id;
                return(
                    <div className='item' key={id}>
                        <img src={image}/>
                        <h1>
                            {name}
                        </h1>
                        {excludedIngredients.length !== 0 && 
                            <p className='item-list'>
                                {excludedIngredients.map((ingredient, i) => {
                                    if(i !== excludedIngredients.length - 1)
                                        return `no ${ingredient}, `
                                    else
                                        return `no ${ingredient}`
                                })}
                            </p>}
                        {sauces.length !== 0 && 
                            <p className='item-list'>
                                {sauces.map((sauce, i) => {
                                    if(i !== sauces.length - 1)
                                        return `no ${sauce}, `
                                    else
                                        return `no ${sauce}`
                                })}
                            </p>}
                        <p className='item-price'>
                            ${price.toFixed(2)}
                        </p>
                        <Quantity prevQuantity={quantity} itemId={id}/>
                    </div>
                )
            })}
        </section>    
    )
}

export default DisplayItems;
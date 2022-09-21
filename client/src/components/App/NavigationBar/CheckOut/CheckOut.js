import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons';
import {v4 as uuid} from 'uuid';
import {removeItem, updateItem} from './actions';
import './styles.css'; 

function CheckOut() {
    const dispatch = useDispatch();

    // (1) - we declare our useSelector() hook that will access the state from the store
    // and will re-render this component everytime there is a change in the state
    const currentOrder = useSelector((state) => state.order); 

    // (1.5) - we create this array because it will contain an array of JSX elements in the loops on step (3)
    const entireOrder = [];

    // (2) - we define our event handler that will enable the user to change the quantity
    // of a specific item in the cart. It will also enable the user to remove items from the cart
    const handleQuantityChange = (e) => {
        //checking to see if the user wants to increase or decrease the quantity of the choosen item
        const increaseOrDecrease = e.target.classList == "increase" ? 1 : -1;

        //selecting the .itemContainer element that contains all the data of the item
        const itemContainer = e.target.parentElement.parentElement;     

        //selecting the .basePrice element that is used ONLY to contain the base price of the item
        const basePrice = itemContainer.querySelector(".basePrice").getAttribute("data-baseprice");
    
        //we increase or decrease the quantity shown to the user
        let currentQuantity = itemContainer.querySelector(".itemQuantityCheckOut");
        let quantityString = currentQuantity.innerHTML;
        let newQuantity = parseInt(quantityString) + increaseOrDecrease;
        let itemID = itemContainer.querySelector(".itemID").getAttribute("id");

        //if the quantity of the item reaches 0, then we will dispatch an action to remove the item from cart
        if(newQuantity <= 0){
            dispatch(removeItem(itemID));
        }
        else{
            //we update the new quantity
            currentQuantity.innerHTML = newQuantity;
            //Update the price based on the new quantity
            let currentPrice = itemContainer.querySelector(".itemPriceCheckOut").lastChild;
            currentPrice.innerHTML = (parseFloat(basePrice) * newQuantity).toFixed(2);
            //dispatch an action to update the quantity of the item in the state object
            dispatch(updateItem(itemID, basePrice ,increaseOrDecrease));
        } 


    }


    // (3) - We will iterate the state object and create JSX elements that will
    // be used to display data for each item in the cart. We will use two 'for' loops to do that...
    // The outer loop will iterate through the items in the cart
    // The inner loop will iterate through the data of each item
    // When the inner loop iterates through the data, it will create JSX elements to contain that data,
    // and will push those JSX elements into an array 'itemData'
    // Once all data has been pushed into the 'itemData' array, then we push 'itemData' into another array
    // called 'entireOrder'
    for(let item in currentOrder){                              //outer loop
        const itemData = [];                                                            
        let currentItem = currentOrder[item];

        for(let property in currentItem){                       //inner loop
            if(property == "itemImage")
                itemData.push(<img key={uuid()} src={currentItem[property]} className={"itemImageCheckOut"}/>);
            else if(property == "itemQuantity"){         
                itemData.push(
                <div className={"quantityContainer"} key={uuid()}>
                    <button className={"decrease"} onClick={handleQuantityChange}>
                        <span className={"eventBubbling"}>
                            <FontAwesomeIcon icon={faMinus}/>
                        </span>
                    </button>  
                    <span className={"itemQuantityCheckOut"}>
                        {currentItem[property]}
                    </span> 
                    <button className={"increase"} onClick={handleQuantityChange}>                
                        <span className={"eventBubbling"}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </span> 
                    </button>             
                </div>
                );
            }
            else if(property == "basePrice"){
                itemData.push(
                    <div className={"basePrice"} data-baseprice={currentItem[property]} key={uuid()}></div>
                )
            }
            else if(property == "id"){
                itemData.push(<div className={"itemID"} id={currentItem[property]} key={uuid()}></div>);
            }
            else if(property != "SliceFromHere"){       
                itemData.push(
                <div key={uuid()} className={property + "CheckOut"}> 
                    <span className={"propertyTitles"}>
                        {currentItem[property] != "" && property.replace("item", "") + ": "} 
                    </span>  
                   <span> 
                        {currentItem[property]}
                    </span> 
                </div>
                );                
            }
        }
        //once we have all the data for the item, we append the item in the order's array
        entireOrder.push(<div className={"itemContainerCheckOut"} key={uuid()}>{itemData}</div>);
    }

    return (
        <>
            <section>
                {entireOrder}
            </section> 
        </>
    )
}

export default CheckOut;


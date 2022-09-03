import React, {useEffect, useRef} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import parse from 'html-react-parser';
import {useDispatch} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'; 
import {v4 as uuid} from 'uuid';
import addItem from './actions';
import './styles.css';

// this function will get the item (that was choosen by the user) from the local storage, 
// the item will then be parsed into a valid HTML element and will have its css classes changed
function DisplayItem() {
    //declaring some hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();   
    const {choosenItem} = useParams();                                              //getting the URL parameter that was passed by a router
    
    //(1) - getting the item from local storage and parsing it into a valid HTML element
    const itemDataString = localStorage.getItem(choosenItem);                       //keep in mind that the item is just a string at this point
    const parser = new DOMParser();
    let newDocument = parser.parseFromString(itemDataString, "text/html");          //newDocument contains <html> and <body> tags
    let item = newDocument.querySelector(".itemContainer");

    //(1.5) - we also make the base price of the item into a local variable here
    // this variable will be used to calculate the new price when the user requests a quantity of more than one
    let basePrice = useRef(item.querySelector(".itemPrice").innerHTML.replace("$", "")); 


    //(2) - we iterate through the parsed HTML element we got from the local storage
    //and we REFACTOR the css properties for the elements
    item.classList.remove("itemContainer");
    item.classList.add("choosenItem");                                          //this class has no css, its only there for selecting the item when we addToOrder()
    let currentElement = item.firstChild;
    while(currentElement != null){
        //remember: data-ignore is used to identify an element that we dont want to display
        if(!currentElement.hasAttribute("data-ignore")) {
            //we only change one css property for all forms and adding an event handler to the radio buttons
            if(currentElement.tagName == "FORM")
                currentElement.style.display = "block";   
            //all other elements will have their entire css class changed, (.itemTitle -> .choosenItemTitle, for example)
            else{
                let currentClass = currentElement.classList[0];
                let formattedClass = currentClass.charAt(0).toUpperCase() + currentClass.slice(1);
                currentElement.classList.remove(currentClass);
                currentElement.classList.add("choosen" + formattedClass);                  
            }
        }        
        else
            currentElement.style.display = "none"

        currentElement = currentElement.nextElementSibling;
    }

    //(3) - we then parse the css-refactored HTML element into valid JSX
    let convertedElement = parse(item.outerHTML);

    //event handlers
    const handleGoBackButton = () => {
        let displayOrder = document.querySelector(".displayOrder");
        if(displayOrder.classList.contains("activate"))
            displayOrder.classList.toggle("activate");

        navigate(-1);
    }
    
    const handleQuantityChange = (e) => {
            //checking to see if the user wants to increase or decrease the quantity of the choosen item
            const increaseOrDecrease = e.target.classList == "increaseQuantity" ? 1 : -1;
        
            //we increase or decrease the quantity shown to the user
            let currentQuantity = document.querySelector(".quantity").innerHTML;
            currentQuantity = parseInt(currentQuantity);
            currentQuantity += increaseOrDecrease;
            document.querySelector(".quantity").innerHTML = currentQuantity;
    
            //we increase or decrease the price based on the new quantity
            let newQuantity = document.querySelector(".quantity").innerHTML;
            document.querySelector(".choosenItemPrice").innerHTML = "$" + (parseFloat(basePrice.current) * parseFloat(newQuantity)).toFixed(2);
    
            //we determine if the decreaseQuantity button should trigger click events
            const redButton = document.querySelector(".decreaseQuantity")
            if(currentQuantity > 1)
                redButton.style = "background-color: red; pointer-events: auto";
            else
                redButton.style = "background-color: grey; pointer-events: none";
    }
    
    const handleAddToOrder = () => {
            const itemContainer = document.querySelector(".choosenItem");
            const allForms = Array.from(itemContainer.querySelectorAll("form"));
            const newItem = {}                  //this object literal will be used to contain all data of the item choosen by user
    
            newItem["itemImage"] = itemContainer.querySelector(".choosenItemImage").getAttribute("src");
            newItem["itemName"] = itemContainer.querySelector(".choosenItemTitle").innerHTML;

            for(let form in allForms){
                let currentForm = allForms[form];
                let choiceType = currentForm.getAttribute("data-type");
                let checkOrRadioBoxes = Array.from(currentForm.children);
                let choices = [];
                checkOrRadioBoxes.forEach((box) => {
                    if(box.checked)
                        choices.push(box.defaultValue);
                })
                newItem["item" + choiceType] = choices.toString();
            }
            newItem["SliceFromHere"] = "ignore";
            newItem['itemPrice'] = itemContainer.querySelector('.choosenItemPrice').innerHTML.replace("$", "");
            newItem["itemQuantity"] = document.querySelector(".quantity").innerHTML;
            newItem["basePrice"] = basePrice.current;
            newItem["id"] = uuid();                    //generating a completely unique ID for each item
            dispatch(addItem(newItem));
    }
    
    const handleSizeChange = (e) => {
        let priceChange = e.target.getAttribute("data-price-change");
        basePrice.current = parseFloat(priceChange);

        let itemPrice = document.querySelector(".choosenItemPrice");
        let currentQuantity = document.querySelector(".quantity").innerHTML;
        currentQuantity = parseFloat(currentQuantity);
        itemPrice.innerHTML = "$" + (basePrice.current * currentQuantity).toFixed(2);

    }

    const DisplayOrder = () => {
        let displayOrder = document.querySelector(".displayOrder");

        if(!displayOrder.classList.contains("activate"))
            displayOrder.classList.toggle("activate");
    }

    useEffect(() => {
        const allInputRadio = document.querySelectorAll("input[type='radio']");
        allInputRadio.forEach((radio) => {
            radio.addEventListener("change", handleSizeChange)
        })

        const addToOrder = document.querySelector(".addToOrderButton");
        addToOrder.addEventListener("click", DisplayOrder);

        return () => {       
            allInputRadio.forEach((radio) => {
                radio.removeEventListener("change", handleSizeChange);
            })
            addToOrder.removeEventListener("click", DisplayOrder);

        }
    });

    return(
        <>
        <div className="choosenItemContainer">
            {convertedElement}
            <button className="decreaseQuantity" onClick={handleQuantityChange}>
                <span> 
                    <FontAwesomeIcon icon={faMinus} />
                </span>
            </button>
            <span className="quantity">  
                {1}
            </span>
            <button className="increaseQuantity" onClick={handleQuantityChange}>
                <span>
                    <FontAwesomeIcon icon={faPlus}/>
                </span>
            </button><br/>   
            <button className="addToOrderButton" onClick={handleAddToOrder} >
                Add to Order
            </button>
            <button className="goBackButton" onClick={handleGoBackButton}>
                Go Back
            </button>                
        </div>
        </>
    )
}

export default DisplayItem;
import React from 'react';

const images = require.context("./images", true);

export default function McDonalds(props) {

    const handleChooseButton = (e) => {
        props.onclick(e.target.parentElement);
    }

    //this is where i left off, i am trying to center all the inputs on the document and im thinking that putting the inputs inside divs may work

    return( //the elements that have the attribute 'data-ignore' will NOT be displayed on the OptionsForItem component
            //remember: all the forms below have 'display: none' initially, we will change it to 'display: block' in OptionsForItem component
        <>
            <img className="restaurantImage" src={images("./McDonalds.png")} alt={"McDonalds"}/> 
            <div className="restaurantIntro">
                <p className="restaurantInfo"> Work Hours: {"Open 24 Hours"}</p>
                <p className="restaurantDeliveryFee"> Delivery Fee: {"$5.00"}</p>
            </div>
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds bigmac.jpg")} alt={"big mac"} />    
                <div className={"itemTitle"}>Big Mac</div>
                <div className={"itemIngredients"} data-ignore="">american cheese, ketchup, pickles, onions, mustard, beef patty</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div> 
                    <input type={"checkbox"} defaultValue={"no american cheese"}/> No American Cheese<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/> No Ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/> No Pickles<br/>
                    <input type={"checkbox"} defaultValue={"no onions"}/> No Onions<br/>
                    <input type={"checkbox"} defaultValue={"no mustard"}/> No Mustard<br/>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/> No beef patty<br/>
                </form>
                <div className={"itemPrice"}>$4.65</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>  
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds quarter pounder with cheese.jpg")} alt={"Quarter Pounder with cheese"} />    
                <div className={"itemTitle"}>Quarter Pounder with Cheese</div>
                <div className={"itemIngredients"} data-ignore="">american cheese, ketchup, pickles, onions, mustard, beef patty</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no american cheese"}/> No American Cheese<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/> No Ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/> No Pickles<br/>
                    <input type={"checkbox"} defaultValue={"no onions"}/> No Onions<br/>
                    <input type={"checkbox"} defaultValue={"no mustard"}/> No Mustard<br/>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/> No beef patty<br/>
                </form>
                <div className={"itemPrice"}>$4.65</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>  
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds double quarter pounder with cheese.jpg")} alt={"double quarter pounder with cheese"} />    
                <div className={"itemTitle"}>Double Quarter Pounder with cheese</div>
                <div className={"itemIngredients"} data-ignore="">american cheese, ketchup, pickles, onions, mustard, beef patties</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no american cheese"}/> No American Cheese<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/> No Ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/> No Pickles<br/>
                    <input type={"checkbox"} defaultValue={"no onions"}/> No Onions<br/>
                    <input type={"checkbox"} defaultValue={"no mustard"}/> No Mustard<br/>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/> No beef patties<br/>
                </form>
                <div className={"itemPrice"}>$5.25</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>  
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds mcdouble.jpg")} alt={"mcDouble"} />    
                <div className={"itemTitle"}>McDouble</div>
                <div className={"itemIngredients"} data-ignore="">beef patty, american cheese, pickles, ketchup, onions, mustard</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/> No beef patty<br/>
                    <input type={"checkbox"} defaultValue={"no american cheese"}/> No american cheese<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/> No Pickles<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/> No ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no mustard"}/> No Mustard<br/>
                    <input type={"checkbox"} defaultValue={"no onions"}/> No onions<br/>
                </form>
                <div className={"itemPrice"}>$2.85</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>   
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds crispy chicken burger.jpg")} alt={"crispy chicken burger"} />    
                <div className={"itemTitle"}>Crispy Chicken Burger</div>
                <div className={"itemIngredients"} data-ignore="">chicken fillet, potato roll, pickles, salted butter</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no chicken fillet"}/> No chicken fillet<br/>
                    <input type={"checkbox"} defaultValue={"no potato roll"}/> No potato roll<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/> No Pickles<br/>
                    <input type={"checkbox"} defaultValue={"no salted butter"}/> No salted butter<br/>
                </form>
                <div className={"itemPrice"}>$3.65</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds mcchicken.jpg")} alt={"McChicken"} />    
                <div className={"itemTitle"}>McChicken</div>
                <div className={"itemIngredients"} data-ignore="">chicken patty, ketchup, shredded lettuce, mayo</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no chicken patty"}/> No chicken patty<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/> No ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no shredded lettuce"}/> No shredded lettuce<br/>
                    <input type={"checkbox"} defaultValue={"no mayo"}/> No mayo
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds chicken nuggets.jpg")} alt={"Chicken Nuggets"} />    
                <div className={"itemTitle"}>Chicken Nuggets</div>
                <div className={"itemSizes"} data-ignore=""> 5 piece, 10 piece, 20 piece</div>
                <div className={"itemSauces"} data-ignore="">ranch, buffalo, honey mustard, sweet and sour</div>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"5 piece"} data-price-change={3.65}/> 5 piece<br/>
                    <input type={"radio"} name={"size"} defaultValue={"10 piece"} data-price-change={4.20} /> 10 piece<br/>
                    <input type={"radio"} name={"size"} defaultValue={"20 piece"} data-price-change={5.45}/> 20 piece<br/>
                </form>
                <form className={"checkBoxes"}>
                    <div className="noteToUser" data-type={"Sauces"}>Select Sauces</div>
                    <input type={"checkBox"} defaultValue={"ranch"}/> ranch<br/>
                    <input type={"checkBox"} defaultValue={"buffalo"}/> buffalo<br/>
                    <input type={"checkBox"} defaultValue={"honey mustard"}/> honey mustard<br/>
                    <input type={"checkBox"} defaultValue={"sweet and sour"}/> sweet and sour<br/>
                </form>
                <div className={"itemPrice"}>$3.65</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds fries.jpg")} alt={"fries"} />    
                <div className={"itemTitle"}>Fries</div>
                <div className={"itemIngredients"} data-ignore="">salt</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no salt"}/> no salt<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={3.00}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={4.20}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={5.20}/> large<br/>
                </form>
                <div className={"itemPrice"}>$3.00</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds coke.jpg")} alt={"Coke"} />    
                <div className={"itemTitle"}>Coke</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size: </div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds drpepper.jpg")} alt={"doctor pepper"} />    
                <div className={"itemTitle"}>Dr.Pepper</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"}/> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds fanta orange.jpg")} alt={"fanta orange"} />    
                <div className={"itemTitle"}>Fanta Orange</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds sprite.jpg")} alt={"sprite"} />    
                <div className={"itemTitle"}>Sprite</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"}/> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser" data-type={"Size"}>Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div> 
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds sweet tea.jpg")} alt={"sweet tea"} />    
                <div className={"itemTitle"}>Sweet Tea</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                <div className="noteToUser">Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>
            <div className={"itemContainer"}>
                <img className={"itemImage"} src={images("./mcdonalds hi-c orange.jpg")} alt={"hi-C orange"} />    
                <div className={"itemTitle"}>Hi-C orange</div>
                <div className={"itemIngredients"} data-ignore="">ice</div>
                <div className={"itemSizes"} data-ignore="">small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"}/> no ice<br/>
                </form>
                <form className={"radioboxes"} data-type={"Size"}>
                    <div className="noteToUser">Select Size:</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={1.45}/> small <br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={2.50}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={3.50}/> large<br/>
                </form>
                <div className={"itemPrice"}>$1.45</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore="">Select Item</button>
            </div>
        </>
    )
}

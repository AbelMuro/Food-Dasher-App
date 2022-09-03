import React from 'react';
import './styles.css';

const images = require.context("./images", true);

export default function JackInTheBox(props) {

    const handleChooseButton = (e) => {
        props.onclick(e.target.parentElement)
    }

    return(
        <>
            <img src={images("./jack in the box logo.png")} className="restaurantImage"/>
            <div className={"restaurantIntro"}>
                <p className={"restaurantInfo"}>
                    Work Hours: Open 24 Hours
                </p>
                <p className={"restaurantDeliveryFee"}>
                    Delivery Fee: $4.99
                </p>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./sourdough jack.png")} className={"itemImage"}/> 
                <div className={"itemTitle"}>Sourdough Jack</div>
                <div className={"itemIngredients"} data-ignore={""}>beef patty, cheedar cheese, bacon, tomatoes, sauce</div>   
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}> Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/> no beef patty <br/>
                    <input type={"checkbox"} defaultValue={"no cheedar cheese"}/> no cheedar cheese <br/>
                    <input type={"checkbox"} defaultValue={"no bacon"}/> no bacon <br/>
                    <input type={"checkbox"} defaultValue={"no tomatoes"}/> no tomatoes<br/>
                    <input type={"checkbox"} defaultValue={"no sauce"}/> no sauce<br/>
                </form>
                <div className={"itemPrice"}>$3.50</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}> Choose Item</button>
            </div>     
            <div className={"itemContainer"}>
                <img src={images("./classic buttery jack.png")} className={"itemImage"}/>    
                <div className={"itemTitle"}>Classic buttery jack</div>
                <div className={"itemIngredients"} data-ignore={""}>beef patty, cheddar cheese, tomatoes, lettuce, ketchup</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}> Select ingredients to exclude </div>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/>no beef patty<br/>
                    <input type={"checkbox"} defaultValue={"no cheddar cheese"}/>no cheddar cheese<br/>
                    <input type={"checkbox"} defaultValue={"no tomatoes"}/>no tomatoes<br/>
                    <input type={"checkbox"} defaultValue={"no lettuce"}/>no lettuce<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/>no ketchup<br/>
                </form>
                <div className={"itemPrice"}>$3.50</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>  
            <div className={"itemContainer"}>
                <img src={images("./bacon & swiss buttery jack.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Bacon and Swiss buttery jack</div>
                <div className={"itemIngredients"} data-ignore={""}>beef patty, cheddar cheese, bacon, sauce</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}>Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no beef patty"}/>no beef patty<br/>
                    <input type={"checkbox"} defaultValue={"no cheddar cheese"}/>no cheddar cheese<br/>
                    <input type={"checkbox"} defaultValue={"no bacon"}/>no bacon<br/>
                    <input type={"checkbox"} defaultValue={"no sauce"}/>no sauce<br/>
                </form>
                <div className={"itemPrice"}>$3.00</div>    
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>       
            </div>
            <div className={"itemContainer"}>
                <img src={images("./double jack.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Double Jack</div>
                <div className={"itemIngredients"} data-ignore={""}>Double patty, american cheese, pickles, lettuce, tomatoes, onions, ketchup, mustard</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}>Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no double patty"}/>no double patty<br/>
                    <input type={"checkbox"} defaultValue={"no american cheese"}/>no american cheese<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/>no pickles<br/>
                    <input type={"checkbox"} defaultValue={"no lettuce"}/>no lettuce<br/>
                    <input type={"checkbox"} defaultValue={"no tomatoes"}/>no tomatoes<br/>
                    <input type={"checkbox"} defaultValue={"no onions"}/>no onions<br/>
                    <input type={"checkbox"} defaultValue={"no ketchup"}/>no ketchup<br/>
                    <input type={"checkbox"} defaultValue={"no mustard"}/>no mustard<br/>
                </form>
                <div className={"itemPrice"}>$3.00</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./cluck sandwhich.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Cluck Sandwhich</div>
                <div className={"itemIngredients"} data-ignore={""}>chicken patty, cheese sauce, pickles</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}>Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no chicken patty"}/>no chicken patty<br/>
                    <input type={"checkbox"} defaultValue={"no cheese sauce"}/> no cheese sauce<br/>
                    <input type={"checkbox"} defaultValue={"no pickles"}/>no pickles<br/>
                </form>
                <div className={"itemPrice"} >$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./spicy chicken.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Spicy Chicken</div>
                <div className={"itemIngredients"} data-ignore={""}>spicy chicken patty, tomatoes, lettuce, mayo</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}>Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no spicy chicken patty"}/>no spicy chicken patty<br/>
                    <input type={"checkbox"} defaultValue={"no tomatoes"}/>no tomatoes<br/>
                    <input type={"checkbox"} defaultValue={"no lettuce"}/>no lettuce<br/>
                    <input type={"checkbox"} defaultValue={"no mayo"}/>no mayo<br/>
                </form>
                <div className={"itemPrice"}> $3.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./homestyle ranch chicken club.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Homestyle Ranch Chicken Club</div>
                <div className={"itemIngredients"} data-ignore={""}>chicken patty, ranch, bacon, lettuce, tomatoes, cheddar cheese</div>
                <form className={"checkBoxes"}>
                    <div className={"noteToUser"}>Select ingredients to exclude</div>
                    <input type={"checkbox"} defaultValue={"no chicken patty"}/>no chicken patty<br/>
                    <input type={"checkbox"} defaultValue={"no ranch"}/> no ranch<br/>
                    <input type={"checkbox"} defaultValue={"no bacon"}/>no bacon<br/>
                    <input type={"checkbox"} defaultValue={"no lettuce"}/>no lettuce<br/>
                    <input type={"checkbox"} defaultValue={"no tomatoes"}/>no tomatoes<br/>
                    <input type={"checkbox"} defaultValue={"no cheddar cheese"}/>no cheddar cheese<br/>
                </form>
                <div className={"itemPrice"}>$4.85</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box fries.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Regular Fries</div>
                <div className={"itemIngredients"} data-ignore={""}>Salt</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box curly fries.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Curly Fries</div>
                <div className={"itemIngredients"} data-ignore={""}>salt</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box coke.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Coke</div>
                <div className={"itemIngredients"} data-ignore={""}>Ice</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box sprite.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>Sprite</div>
                <div className={"itemIngredients"} data-ignore={""}>Ice</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box fanta strawberry.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>fanta strawberry</div>
                <div className={"itemIngredients"} data-ignore={""}>Ice</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>
            <div className={"itemContainer"}>
                <img src={images("./jack in the box mocha ice coffee.png")} className={"itemImage"}/>
                <div className={"itemTitle"}>mocha ice coffee</div>
                <div className={"itemIngredients"} data-ignore={""}>Ice</div>
                <div className={"itemSizes"} data-ignore={""}>small, medium, large</div>
                <form className={"checkBoxes"} data-type={"Ingredients"}>
                    <div className="noteToUser">Select Ingredients to exclude:</div>
                    <input type={"checkbox"} defaultValue={"no ice"} /> no ice<br/>
                </form>
                <form className={"radioboxes"}>
                    <div className={"noteToUser"}>Select Size</div>
                    <input type={"radio"} name={"size"} defaultValue={"small"} data-price-change={"2.99"}/> small<br/>
                    <input type={"radio"} name={"size"} defaultValue={"medium"} data-price-change={"3.50"}/> medium<br/>
                    <input type={"radio"} name={"size"} defaultValue={"large"} data-price-change={"4.00"}/>large<br/>
                </form>
                <div className={"itemPrice"}>$2.99</div>
                <button className={"chooseItem"} onClick={handleChooseButton} data-ignore={""}>Choose Item</button>
            </div>

        </>
    )
}

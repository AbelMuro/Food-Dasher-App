
const OrderReducer = (state = { order: [] }, action) => {
    var order = state.order;
    var newItem = action.item;
    
    switch(action.type) {
        case 'add item': 
            if(order.length == 0)
                return {order: [newItem]};
            else {
                //This is the logic that im using for this case.
                //Before we add a new item to the cart, we want to make sure 
                //that the cart doesn't already have an item with the same variation 
                //of the new item. If the same variation does exist in the cart, 
                //then we just increase the quantity and the price of the variation
                //if it doesn't, then we append the new item at the beginning of the cart
                for(let item in order) {
                    var itemAlreadyInOrder = order[item];       
                    if(itemAlreadyInOrder.itemName == newItem.itemName){    
                        //(1) we first stringify the two objects we are comparing 
                        let itemInOrderString = JSON.stringify(itemAlreadyInOrder);
                        let newItemString = JSON.stringify(newItem); 
                        
                        //(2) we then slice the strings in two, the part of the string that is 
                        // discarded has properties that we don't need to compare... 
                        // 'itemPrice'  'itemQuantity' 'basePrice' 'id'
                        // The part of the string that we keep has properties that we need to compare...
                        // 'itemName' 'itemIngredients' 'itemSize' , etc...
                        let indexOne = itemInOrderString.indexOf('"SliceFromHere"');        
                        let indexTwo = newItemString.indexOf('"SliceFromHere"');           
                        itemInOrderString = itemInOrderString.slice(0, indexOne);
                        newItemString = newItemString.slice(0, indexTwo);

                        //(3) we compare both strings to see if the variation of the item already exists in the order 
                        if(itemInOrderString == newItemString){
                            var quantity = itemAlreadyInOrder.itemQuantity;
                            var price = itemAlreadyInOrder.itemPrice;    
                            return {order: order.map((items) => {
                                        if(items == itemAlreadyInOrder) {
                                            let itemQuantity = (parseInt(quantity) + parseInt(newItem.itemQuantity)).toString();
                                            let itemPrice = (parseFloat(price) + parseFloat(newItem.itemPrice)).toFixed(2);
                                            return {...items, itemPrice: itemPrice ,itemQuantity: itemQuantity }
                                        }
                                        else
                                            return items;
                                    })}  
                        }
                    } 
                    if(order.length == parseInt(item) + 1)
                        return {order: [newItem, ...order]};
                }
            }
            break;
        case 'remove item':
                return {
                    order: order.filter((item)=>{
                        if(item.id == action.itemID)
                            return false;
                        else
                            return true;
                    })
            }
        case 'update item':
                return {
                    order: order.map((item) => {
                        if(item.id == action.itemID){
                            let currentQuantity = parseInt(item.itemQuantity) + action.changeQuantity;
                            let newPrice = (parseFloat(action.basePrice) * currentQuantity).toFixed(2);
                            return{...item, itemQuantity: currentQuantity, itemPrice: newPrice};
                        } 
                        else
                            return item;
                    }) 
                }
        default: 
            return state;
    }
}

export default OrderReducer;

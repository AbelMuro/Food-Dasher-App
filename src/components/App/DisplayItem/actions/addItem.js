function addItem(item){    
    let action = {
        type: "add item",
        item: item
    }
    return action;
}

export default addItem;
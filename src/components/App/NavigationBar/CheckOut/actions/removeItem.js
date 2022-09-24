export function removeItem(itemID){
    let action = {
        type: "remove item",
        itemID: itemID
    }
    return action;

}
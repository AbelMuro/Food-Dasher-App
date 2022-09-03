export function updateItem(itemID, basePrice,increaseOrDecrease) {
    let action = {
        type: "update item",
        itemID: itemID,
        basePrice: basePrice,
        changeQuantity: increaseOrDecrease

    }
    return action;

}

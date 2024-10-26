import React from "react";

function Item({item, onDeleteItem, onEditItem}) {

    return <div>
        <p className="item-name"><b>Item Name: </b>{item.name}</p>
        <p className="item-cal"><em>Calories: </em>{item.calories}</p>
        <p className="item-quantity"><em>Quantity: </em>{item.quantity}</p>
        <p className="item-id"><em>Item ID: </em>{item.id}</p>

        <button className="delete-button" onClick={() => onDeleteItem(item.id)}>
            Delete Item
        </button>


    </div>





}

export default Item

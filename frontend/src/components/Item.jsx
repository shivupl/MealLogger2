import React, { useEffect, useState } from "react";
import api from "../api";

function Item({item, onDeleteItem, onEdititem, method}) {

    //const val = method == true ? "Edit" : "View"

    const [val, setVal] = useState(method==true ? "Edit" : "View");



    const[name, setName] = useState("");
    const[calories, setCal] = useState(0);
    const[quantity, setQuantity] = useState(0);


    useEffect(() => {
        setName(item.name);
        setCal(item.calories);
        setQuantity(item.quantity);
    },[item])

    const updateItem = (e) => {
        e.preventDefault();
        api.put(`api/item/${item.id}/edit`, {name, calories, quantity}).then((res) => {
            if(res.status == 200){
                alert("item updated");
                //setVal("View");
            }
            else alert("error");
        }).catch((err) => alert(err))

    }

    const handleEditClick = () => {
        onEdititem(item.id);  
        setVal("Edit");  
    };

    const handleSaveClick = (e) => {
        updateItem(e);
        setVal("View");
    }


    return (<div>

        {val === "View" && (
        <div>
            <p className="item-name"><b>Item Name: </b>{item.name}</p>
            <p className="item-cal"><em>Calories: </em>{item.calories}</p>
            <p className="item-quantity"><em>Quantity: </em>{item.quantity}</p>
            <p className="item-id"><em>Item ID: </em>{item.id}</p>

            <button className="edit-button" onClick={handleEditClick}>
                Edit/Change Item
            </button> 
            <button className="delete-button" onClick={() => onDeleteItem(item.id)}>
            Delete Item
            </button>
            
        </div>
        )}

        {val === "Edit" && (
        <div>
            <p className="item-name"><b>Item Name: </b>
                <input 
                type="text"
                name = "name"
                id = "name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}  />
            </p>

            <p className="item-cal"><em>Calories: </em>
                <input 
                type="number"
                name = "calories"
                id = "calories"
                value={calories}
                onChange={(e) => setCal(e.target.value)}
                 />
            </p>

            <p className="item-quantity"><em>Quantity: </em>
                <input 
                type="number"
                name = "quantity"
                id = "quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                 />
            </p>

            <p className="item-id"><em>Item ID: </em>{item.id}</p>

            <button className="save-button" onClick={handleSaveClick}>
                Save 
            </button>

            <button className="delete-button" onClick={() => onDeleteItem(item.id)}>
                Delete Item
            </button>

            
        </div>
        )}
        {/* <button className="delete-button" onClick={() => onDeleteItem(item.id)}>
            Delete Item
        </button> */}



    </div>
    );


}

export default Item

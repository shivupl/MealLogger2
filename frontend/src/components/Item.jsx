import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/item.css"

function Item({item, onDeleteItem, onEdititem, method}) {

    //const val = method == true ? "Edit" : "View"

    const [val, setVal] = useState(method==true ? "Edit" : "View");



    const[name, setName] = useState("");
    const[calories, setCal] = useState(0);
    const[quantity, setQuantity] = useState(0);
    const[protein, setProtein] = useState(0);
    const[fat, setFat] = useState(0);
    const[sugar, setSugar] = useState(0);



    const getItem = () => {
        api.get(`api/item/${item.id}/view`).then((res) => {
            setName(item.name);
            setCal(item.calories);
            setQuantity(item.quantity);
            setProtein(item.protein);
            setFat(item.fat);
            setSugar(item.sugar);
        }).catch((err) => alert(err))
    }



    useEffect(() => {
        getItem();
    },[item])

    const updateItem = (e) => {
        e.preventDefault();
        api.put(`api/item/${item.id}/edit`, {name, calories, quantity, protein, fat, sugar}).then((res) => {
            if(res.status == 200){
                alert("item updated");
                //setVal("View");
                getItem();
            }
            else alert("error");
        }).catch((err) => alert(err))

    }

    const handleEditClick = () => {
        onEdititem(item.id);  
        getItem();
        setVal("Edit");  
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        api.put(`api/item/${item.id}/edit`, { name, calories, quantity, protein, fat, sugar }).then((res) => {
            if (res.status === 200) {
                alert("Item updated");
                onEdititem(res.data);
                setVal("View");
            } else {
                alert("Error updating item");
            }
        }).catch((err) => alert(err));
    };
    


    return (<div className="item-container">

        {val === "View" && (
        <div>
            <p className="item-name"><b>{item.name}</b></p>
            <p className="item-quantity"><em>Quantity: </em>{item.quantity} <em> grams</em></p>
            <p className="item-cal">{item.calories} Calories</p>
            <p className="item-cal">{item.protein}g Protein</p>
            <p className="item-cal">{item.fat}g Total Fats</p>
            <p className="item-cal">{item.sugar}g Sugar</p>
            {/* <p className="item-id"><em>Item ID: </em>{item.id}</p> */}

            <button className="item-edit-button" onClick={handleEditClick}>
                Edit/Change Item
            </button> 
            <button className="item-delete-button" onClick={() => onDeleteItem(item.id)}>
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
                onChange={(e) => setName(e.target.value)}  
                />
            </p>


            <p className="item-quantity"><em>Quantity: </em>
                <input 
                type="number"
                name = "quantity"
                id = "quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                 />
            </p>

            <p className="item-cal"><em>Calories: </em>
                <input 
                type="number"
                name = "calories"
                id = "calories"
                value={calories}
                onChange={(e) => setCal(e.target.value)}
                required
                 />
            </p>

            <p className="item-pro"><em>Protein: </em>
                <input 
                type="number"
                name = "protein"
                id = "protein"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                required
                 />
            </p>

            <p className="item-fat"><em>Fat: </em>
                <input 
                type="number"
                name = "fat"
                id = "fat"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                required
                 />
            </p>

            <p className="item-sugar"><em>Sugar: </em>
                <input 
                type="number"
                name = "sugar"
                id = "sugar"
                value={sugar}
                onChange={(e) => setSugar(e.target.value)}
                required
                 />
            </p>







            <button className="save-button" onClick={handleSaveClick}>
                Save 
            </button>

            <button className="item-delete-button" onClick={() => onDeleteItem(item.id)}>
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

import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api"
//import Meal from "../components/Meal"
import "../styles/AddMeal.css"

function AddMeal() {

const [description, setDesc] = useState("")
const [title, setTitle] = useState("")
const [which, setWhich] = useState("")


const [itemName, setItemName] = useState("");
const [itemCal, setItemCal] = useState(0);
const [itemQuantity, setItemQuantity] = useState(0);

const [items, setItems] = useState([]);


const nav = useNavigate();

const createMeal = (e) => {
    e.preventDefault();
    api.post("api/meals/", {description, title, which}).then((res) => {
        if (res.status === 201){
            const mID = res.data.id;
            alert("Meal Added");
            items.forEach((item) => {
                createItem(mID, item);
            });
            nav("/");
        }
        else{
            alert("unable to add meal")
            print("Response status:", res.status);
            print("Response data:", res.data);
        }
    }).catch((err) => alert(err))
}


const addItem = (e) => {
    e.preventDefault();
    const temp = {
        name: itemName,
        calories: itemCal,
        quantity: itemQuantity,
    };
    setItems([...items, temp]);
    setItemName("");
    setItemCal(0);
    setItemQuantity(0);
}

const createItem = (mealId, item) => {
    api.post(`api/meal/${mealId}/items`, {name: item.name, calories: item.calories, quantity: item.quantity}).then((res) => {
        if(res.status != 201) {
            alert("could not add item");
        }
    }).catch((err) => alert(err));
}



return <div>
    <h2 className="page-title">Log A Meal</h2>

    <form onSubmit={createMeal}>
        <label htmlFor="title">Title:</label>
        <br />

        <input 
            type="text" 
            id = "title" 
            name = "title" 
            required onChange={(e) => setTitle(e.target.value)}
            value = {title} 
        />


        <label htmlFor="description">Description:</label>
        <br />

        <textarea 
            name="description" 
            id="description" 
            required value={description}
            onChange={(e) => setDesc(e.target.value)}>      
        </textarea>


        <br />
        <label htmlFor="which">Which:</label>
        
        <select required value={which} onChange={(e) => setWhich(e.target.value)}>
            <option value="">Select a Meal Type</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
        </select>
        <br />


        <h3>Add Items</h3>

        <label htmlFor="itemName">Item Name:</label>
        <br />
        <input
            type="text"
            id="itemName"
            name="itemName"
            required
            onChange={(e) => setItemName(e.target.value)}
            value={itemName}
        />
        <label htmlFor="itemCal">Calories:</label>
        <br />
        <input
            type="number"
            id="itemCal"
            name="itemCal"
            required
            onChange={(e) => setItemCal(e.target.value)}
            value={itemCal}
        />
        <label htmlFor="itemQuantity">Quantity:</label>
        <br />
        <input
            type="number"
            id="itemQuantity"
            name="itemQuantity"
            required
            onChange={(e) => setItemQuantity(e.target.value)}
            value={itemQuantity}
        />
        <br />
        <button onClick={addItem}>Add Item</button>


        <br />

        <input type="submit" value="Submit"></input>


    </form>
</div>


}

export default AddMeal

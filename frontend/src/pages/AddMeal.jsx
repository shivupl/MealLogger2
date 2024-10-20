import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api"
//import Meal from "../components/Meal"
import "../styles/AddMeal.css"

function AddMeal() {
const [description, setDesc] = useState("")
const [title, setTitle] = useState("")
const [which, setWhich] = useState("")


const nav = useNavigate();

const createMeal = (e) => {
    e.preventDefault()
    api.post("api/meals/", {description, title, which}).then((res) => {
        if (res.status === 201){
            alert("Meal Added");
            nav("/")
        }
        else{
            alert("unable to add meal")
            print("Response status:", res.status);
            print("Response data:", res.data);
        }
    }).catch((err) => alert(err))
}


// const createItem = (e) => {
//     e.preventDefault()
//     api.post("api/meals/")
// }


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

        <input type="submit" value="Submit"></input>


    </form>
</div>


}

export default AddMeal

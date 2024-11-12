import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../api"
//import Meal from "../components/Meal"
import "../styles/AddMeal.css"
import axios from 'axios';
import { useState } from "react";

function AddMeal() {
    const {register, control, handleSubmit, setValue, getValues} = useForm()
    const {fields, append, remove} = useFieldArray({
        name: "items",
        control, 
    })

    const [itemName, setItemName] = useState("");

    const nav = useNavigate();

    const createMeal = (data) => {
        const { description, which, items } = data;
        api.post("api/meals/", {description, which}).then((res) => {
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


    const createItem = (mealId, item) => {
        api.post(`api/meal/${mealId}/items`, item).then((res) => {
            if(res.status != 201) {
                alert("could not add item");
            }
        }).catch((err) => alert(err));
    }


    const fetchItemInfo = async (index) => {
        try {
            const itemName = getValues(`items.${index}.name`);
            const itemQ = getValues(`items.${index}.quantity`) + 'g ';
            const res = await axios.get(`http://localhost:8000/api/fetch-item-info/${itemQ+itemName}`)
            if(res.status === 200){
                const data = res.data;
                setValue(`items.${index}.calories`, data.items[0].calories);
                setValue(`items.${index}.fat`, data.items[0].fat_total_g);
                setValue(`items.${index}.sugar`, data.items[0].sugar_g);
                setValue(`items.${index}.protein`, data.items[0].protein_g);

                setItemName("");
            }
            else{
                alert("Unable to find item, please enter information manually.")
            }

        } catch (err) {
            alert("Error: ",err);

        }

    }

    return <div className="add-page-container">
        <h2 className="page-title">Log A Meal</h2>

        <form onSubmit={handleSubmit(createMeal)}>

            <label htmlFor="which" required>Which: </label>
            
            <select {...register("which", {required: true})}>
                <option value="">Select a Meal Type</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
            </select>
            
            <br />
            <br />

            <label htmlFor="description">Notes(Optional):</label>
            <br />
            <textarea 
                name="description" 
                id="description" 
                {...register("description", {required: false})}>      
            </textarea>


            <br />


            <label htmlFor="items" required>Add Items:</label>
            <br />
            <br />

            {fields.map((field, index) => {
                return <div key = {field.id}>

                <div className="add-item">
                    <span htmlFor="name">Item Name:</span>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        {...register(`items.${index}.name`,{required: true})}
                    />

                    <span htmlFor="quantity">Quantity(grams):</span>
                    <br />
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        step="0.01"
                        required
                        {...register(`items.${index}.quantity`, {required: true})}
                    />

                    <div className="pre-wrapper">
                        <button type="button" className="itemPre" onClick={() => fetchItemInfo(index)}>Autofill Macros</button>
                    </div>
                    
                    <br />
                    <div className="macros">
                        <span htmlFor="calories">Calories(kcal):</span>
                            <input
                            type="number"
                            id="calories"
                            name="calories"
                            className="cal-input"
                            step="0.01"
                            required
                            {...register(`items.${index}.calories`, {required: true})}
                        />

                        <span htmlFor="protein">Protein(g):</span>
                        <input
                            type="number"
                            id="protein"
                            name="protein"
                            className="pro-input"
                            step="0.01"
                            required
                            {...register(`items.${index}.protein`, {required: true})}
                        />

                        <br />
                        <span htmlFor="fat">Total Fat(g):</span>
                        <input
                            type="number"
                            id="fat"
                            name="fat"
                            className="fat-input"
                            step="0.01"
                            required
                            {...register(`items.${index}.fat`, {required: true})}
                        />

                        <span htmlFor="sugar">Sugar(g):</span>
                        <input
                            type="number"
                            id="sugar"
                            name="sugar"
                            className="sug-input"
                            step="0.01"
                            required
                            {...register(`items.${index}.sugar`, {required: true})}
                        />
                    </div>

                    <br />

                    <button type = "button" className= "item-remove-button" onClick={() => remove(index)}>
                        Remove Item
                    </button>
                </div>

                    <br />

                </div>
            })}

            <button type = "button" className="item-add-button"
            onClick={() => append({ name: "" , calories: 0, quantity: 0})}>
                Add Item
            </button>

            <br />
            <br />

            
            

            <br />

            <input type="submit" value="Submit"></input>


        </form>
    </div>


}

export default AddMeal
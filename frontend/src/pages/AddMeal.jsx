import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import api from "../api"
//import Meal from "../components/Meal"
import "../styles/AddMeal.css"

function AddMeal() {
    const {register, control, handleSubmit} = useForm()
    const {fields, append, remove} = useFieldArray({
        name: "items",
        control, 
    })



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


    return <div>
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

            {fields.map((field, index) => {
                return <div key = {field.id}>

                    <span htmlFor="name">Item Name:</span>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        {...register(`items.${index}.name`,{required: true})}
                    />

                    <span htmlFor="calories">Calories:</span>
                    <br />
                    <input
                        type="number"
                        id="calories"
                        name="calories"
                        required
                        {...register(`items.${index}.calories`, {required: true})}
                    />

                    <span htmlFor="quantity">Quantity:</span>
                    <br />
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        required
                        {...register(`items.${index}.quantity`, {required: true})}
                    />

                    <button type = "button" className= "item-remove-button" onClick={() => remove(index)}>
                        Remove Item
                    </button>

                    <br />
                    <br />

                </div>
            })}
            <br />

            <button type = "button" className="item-add-button"
            onClick={() => append({ name: "" , calories: 0, quantity: 0})}>
                Add Item
            </button>

        

            <br />

            <input type="submit" value="Submit"></input>


        </form>
    </div>


}

export default AddMeal
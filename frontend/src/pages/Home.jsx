import { useEffect, useState } from "react"
import api from "../api"
import Meal from "../components/Meal"

function Home() {
    const [meals, setMeals] = useState([])
    const [description, setDesc] = useState("")
    const [title, setTitle] = useState("")


    const getMeals = () => {
        api.get("/api/meals/").then((response) => response.data).then((data) => setMeals(data)).catch((error) => alert(error));
    };

    useEffect(() => { // autoload side effect 
        getMeals();
    }, [])


    const deleteMeal = (id) => {
        api.delete(`api/meal/${id}/delete`).then((res) => {
            if (res.status == 204)
                alert("Meal Deleted")
            else alert("could not delete meal")
            getMeals();

        }).catch((err) => alert(err))
        
    };

    const createMeal = (e) => {
        e.preventDefault()
        api.post("api/meals/", {description, title}).then((res) => {
            if (res.status === 201) 
                alert("Meal Added");
            else{
                alert("unable to add meal")
                print("Response status:", res.status);
                print("Response data:", res.data);
            }
            getMeals();
        }).catch((err) => alert(err))
    }


    return <div>
        <div>
            <h2>Meals</h2>
            {meals.map((meal) => <Meal meal = {meal} onDelete = { deleteMeal}
            key = {meal.id}/>)}

        </div>
        <h2>Create A Meal</h2>
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
            <input type="submit" value="Submit" />

        </form>
    </div>

    // return <div> 
    //     <h1>hello</h1>
    // </div>


}

export default Home

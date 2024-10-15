import { useEffect, useState } from "react"
import api from "../api"
import Meal from "../components/Meal"
import "../styles/Home.css"

function Home() {
    const [meals, setMeals] = useState([])
    const [description, setDesc] = useState("")


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


    return <div>
        <div className="meals-container">
            <h2>Meals</h2>

            {meals.map((meal) => <Meal meal = {meal} onDelete = {deleteMeal}
            key = {meal.id} className= "meal-each"/>
            
            )}

        </div>
    </div>

}

export default Home

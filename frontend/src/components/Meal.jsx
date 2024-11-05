import React from "react";
import "../styles/Meal.css"
import { useNavigate } from "react-router-dom";

function Meal({meal, onDelete}) {


    const nav = useNavigate();

    const viewMeal = () => {

        nav(`/meal/${meal.id}/view`);  // Navigate to the meal detail page
    };

    const fDate = new Date(meal.created_at).toLocaleDateString("en-US")


    return (<div className = "meal-container">
        {/* <p className="meal-title">{meal.title}</p> 
        <p className="meal-desc">{meal.description}</p> */}
        <p className="meal-which">{meal.which}</p>
        <p className="meal-date">{fDate}</p>

        <button className="view-button" onClick={viewMeal}>
            View Meal
        </button>

        <button className="meal-delete-button" onClick={() => onDelete(meal.id)}>
            Delete
        </button>
        
    </div>
    );
}

export default Meal
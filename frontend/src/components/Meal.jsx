import React from "react";
import "../styles/Meal.css"

function Meal({meal, onDelete}) {

    const fDate = new Date(meal.created_at).toLocaleDateString("en-US")


    return (<div className = "meal-container">
        <p className="meal-title">{meal.title}</p> 
        <p className="meal-desc">{meal.description}</p>
        <p className="meal-date">{fDate}</p>
        <p className="meal-which">{meal.which}</p>
        <button className="delete-button" onClick={() => onDelete(meal.id)}>
            Delete
        </button>
        
    </div>
    );
}

export default Meal
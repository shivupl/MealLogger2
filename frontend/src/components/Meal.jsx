import React from "react";

function Meal({meal, onDelete}) {

    const fDate = new Date(meal.created_at).toLocaleDateString("en-US")


    return (<div classname = "meal-container">
        <p className="meal-title">{meal.title}</p> 
        <p className="meal-desc">{meal.description}</p>
        <p className="meal-date">{fDate}</p>
        <button className="delete-button" onClick={() => onDelete(meal.id)}>
            Delete
        </button>
        
    </div>
    );
}

export default Meal
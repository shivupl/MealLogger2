import React from "react";
import "../styles/Navbar.css" 


function Navbar(){
    return <nav className = "nav">
        <ul>
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/addMeal">Log A Meal</a>
            </li>
            <li>
                <a className="logout-button" href="/logout">Logout</a>
            </li>

            
        </ul>






    </nav>
}

export default Navbar
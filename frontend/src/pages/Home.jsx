import { useEffect, useState } from "react"
import api from "../api"
import Meal from "../components/Meal"
import "../styles/Home.css"

function Home() {
    const [meals, setMeals] = useState({})
    const [currDate, setCurrDate] = useState(new Date());
    const [week, setWeek] = useState([]);

    const currWeekDays = () => {
        const days = [];
        for(let i = 0; i < 7; i++){
            const temp = new Date(currDate);
            temp.setDate(currDate.getDate() - currDate.getDay() + i + 1);
            days.push(temp);
        }
        setWeek(days);
    }

    const groupMeals = (meals) => {
        const groups = {};
        meals.forEach((meal) => {
            const date = new Date(meal.created_at).toDateString();
            if(!groups[date])
                groups[date] = [];
            groups[date].push(meal);
        });
        return groups;
    }


    const getMeals = () => {
        api.get("/api/meals/").then((res) => {
            setMeals(groupMeals(res.data))
        }).catch((error) => alert(error));
    };

    useEffect(() => {
        getMeals();
        currWeekDays();
    }, [currDate]);

    const deleteMeal = (id) => {
        api.delete(`api/meal/${id}/delete`).then((res) => {
            if (res.status == 204)
                alert("Meal Deleted")
            else alert("could not delete meal")
            getMeals();

        }).catch((err) => alert(err))
    };


    const lastWeek = () => {
        const temp = new Date(currDate);
        temp.setDate(currDate.getDate() - 7);
        setCurrDate(temp);
    };

    const nextWeek = () => {
        const temp = new Date(currDate);
        temp.setDate(currDate.getDate()+7);
        setCurrDate(temp);
    }

    return <div className="page-container">
        <br />

        <div className="page-header">
            <br />
            <h1><strong>My Meals</strong></h1>
        </div>

        <div className="cal-container">
            <div className="ln-buttons">
                <button onClick={lastWeek} className="last-button"> 
                    Last Week 
                </button>

                <button onClick={nextWeek} className="next-button"> 
                    Next Week 
                </button>
            </div>


            <div className="grid-container">
                {week.map((date,index) => {
                    const newMeals = meals[date.toDateString()] || [];
                    return ( 
                    <div key={index}>

                        <div className="cal-date">
                            <h3>{date.toLocaleDateString('en-US', { weekday: 'long' })}</h3>
                            <h3>{date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</h3>
                        </div>
                        

                        <div className="cal-meal">
                            {newMeals.map((meal) => (
                                <Meal meal={meal} onDelete={deleteMeal} key={meal.id} />
                            ))}
                        </div>

                    </div>)

                })}


            </div>
            
        </div>

        


    
    
    
    </div>
}

export default Home

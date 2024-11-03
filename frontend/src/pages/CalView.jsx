import { useEffect, useState } from "react"
import api from "../api"
import Meal from "../components/Meal";
import "../styles/CalView.css"

function CalView() {
    const [meals, setMeals] = useState({})
    const [currDate, setCurrDate] = useState(new Date());
    const [week, setWeek] = useState([]);

    const currWeekDays = () => {
        const days = [];
        for(let i = 0; i < 7; i++){
            const temp = new Date(currDate);
            temp.setDate(currDate.getDate() + i);
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

    return <div>

        <div>
            <button onClick={lastWeek}> 
                Last Week 
            </button>

            <button onClick={nextWeek}> 
                Next Week 
            </button>
        </div>


        <div className="grid-container">
            {week.map((date,index) => {
                const newMeals = meals[date.toDateString()] || [];
                return ( <div key={index} className="grid-item">

                    <h3>{date.toDateString()} ({date.toLocaleDateString('en-US', { weekday: 'short' })})</h3>
                    
                    {newMeals.map((meal) => (
                        <Meal meal={meal} onDelete={deleteMeal} key={meal.id} />
                    ))}
                </div>)

            })}


        </div>


    
    
    
    </div>


}

export default CalView

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../api"


function MealDetail(){

    const { id } = useParams();

    const [meal, setMeal] = useState(null);
    
    const getMeal = () => {
        api.get(`api/meal/${id}/view`)
        .then((res) => {
            setMeal(res.data);
        }).catch((err) => alert(err))
    } 

    useEffect(() => {
        getMeal();
    }, [id]);


    return (
        <div>
            <h2>Meal Details</h2>
            <p> mead il: {id}</p>
            <p><strong>Title:</strong> {meal?.title}</p>
            <p><strong>Description:</strong> {meal?.description}</p>
            <p><strong>Created At:</strong> {new Date(meal?.created_at).toLocaleString()}</p>
            <p><strong>Which:</strong> {meal?.which}</p>
        </div>
    );
}

export default MealDetail
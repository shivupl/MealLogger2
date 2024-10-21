import { useEffect,useState } from "react"
import api from "../api"
import { useNavigate, useParams } from "react-router-dom";


function EditMeal() {

    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [which, setWhich] = useState("");

    const nav = useNavigate();

    useEffect(() => {
        api.get(`api/meal/${id}/view`).then((res) => {
            const meal = res.data;
            setTitle(meal.title);
            setDesc(meal.description);
            setWhich(meal.which);
        })
        .catch((err) => alert(err));
    }, [id]);


    const updateMeal = (e) => {
        e.preventDefault();
        api.put(`api/meal/${id}/edit`, {description, title, which}).then((res) => {
            if(res.status == 200){
                alert("Meal Updated");
                nav(`/meal/${id}/view`);
            }
            else{
                alert("error");
            }
        })
        .catch((err) => alert(err))
    }


    return (
        <div>

            <h2 className="page-title">Edit Meal</h2>

            <form onSubmit={updateMeal}>
                <label htmlFor="title">Title:</label>
                <br />
                <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    required value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <br />

                <label htmlFor="description">Description:</label>
                <br />

                <textarea 
                    name="description" 
                    id="description" 
                    required value={description} 
                    onChange={(e) => setDesc(e.target.value)}>
                </textarea>

                <br />

                <label htmlFor="which">Which:</label>
                <br />
                <select required value={which} 
                        onChange={(e) => setWhich(e.target.value)}>
                    <option value="">Select a Meal Type</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                </select>
                <br />

                <input type="submit" value="Update Meal"></input>
            </form>


        </div>
    );
}

export default EditMeal
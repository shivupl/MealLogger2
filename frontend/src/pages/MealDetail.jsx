import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"
import Item from "../components/Item";


function MealDetail(){

    const { id } = useParams();

    const [meal, setMeal] = useState(null);
    const [items, setItems] = useState([]);

    const [editItem, setEdit] = useState(null);


    const nav = useNavigate();

    const getMeal = () => {
        api.get(`api/meal/${id}/view`)
        .then((res) => {
            setMeal(res.data);
            setItems(res.data.items)
        }).catch((err) => alert(err))
    } 


    useEffect(() => {
        getMeal();
    }, [id]);


    const editMeal = () => {
        
        nav(`/meal/${id}/edit`)

    }

    const deleteItem = (itemID) => {
        api.delete(`api/item/${itemID}/delete`).then((res) => {
            if(res.status == 204)
                alert("Item Deleted");
            else alert("unable to delete meal");
            getMeal();
        }).catch((err) => alert(err))
    };


    const editableItem = (itemID) => {
        setEdit(itemID);
    }


    // const editItem = (itemID) => {
    //     api.put(`api/item/${itemID}/edit`).then((res) => {
    //         if(res.staus == 200)
    //             alert("Item Updated");
    //         else
    //             alert("unable to edit item");
    //     }).catch((err) => alert(err))
    // };





    return (
        <div>
            <h2>Meal Details</h2>
            <p> mead il: {id}</p>
            <p><strong>Title:</strong> {meal?.title}</p>
            <p><strong>Description:</strong> {meal?.description}</p>
            <p><strong>Created At:</strong> {new Date(meal?.created_at).toLocaleString()}</p>
            <p><strong>Which:</strong> {meal?.which}</p>
            <br />

            {items.map((item) => (
                < Item item = {item} 
                onDeleteItem={deleteItem}
                onEdititem = {editableItem} 
                key = {item.id}
                method = {item.id == editItem}
                className = "item-each"/>
            ))}







            <br />
            <button className="edit-button" onClick={editMeal}>
                Edit Meal
            </button>



        </div>
    );
}

export default MealDetail

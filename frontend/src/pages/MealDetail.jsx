import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api"
import Item from "../components/Item";


function MealDetail(){

    const { id } = useParams();

    const [meal, setMeal] = useState(null);
    const [items, setItems] = useState([]);

    const [editItem, setEdit] = useState(null);
    const [hasNotes, setHasNotes] = useState(true);


    const nav = useNavigate();

    const getMeal = () => {
        api.get(`api/meal/${id}/view`)
        .then((res) => {
            setMeal(res.data);
            setItems(res.data.items);
            setHasNotes(res.data.description != "");
        }).catch((err) => alert(err))
    } 


    useEffect(() => {
        getMeal();
    }, [id]);


    const editMeal = () => {    
        nav(`/meal/${id}/edit`)
        getMeal();

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
        getMeal();
    }


    const refItem = (updatedItem) => {
        itemUpdate(updatedItem); 
    };

    const itemUpdate = (updatedItem) => {
        setItems((prevItems) => {
            return prevItems.map((item) => {
                if (item.id == updatedItem.id)
                    return updatedItem;
                else
                    return item;
            });
        });
    };

    const createItem = () => {

        api.post(`api/meal/${id}/items`, {name:"", calories: 0 , quantity: 0, fat:0, sugar:0, protein:0}).then((res) => {
            if(res.status != 201) {
                alert("could not add item");
            }
            setEdit(res.data.id);
            getMeal();
        }).catch((err) => alert(err));
    }


    return (
        <div>
            <h2>Meal Details</h2>
            {/* <p>{new Date(meal?.created_at).toLocaleString()}</p> */}

            <p>{meal?.which}, {new Date(meal?.created_at).toDateString()}</p>

            {hasNotes && (
                <p><strong>Notes:</strong> {meal?.description}</p>
            )}
            <br />

            
            {items.map((item) => (
                < Item item = {item} 
                onDeleteItem={deleteItem}
                onEdititem = {refItem}
                key = {item.id}
                method = {item.id == editItem}
                className = "item-each"/>
            ))}

            <br />

            <button className="add-button" onClick={createItem}>
                Add an Item
            </button>

            <br />
            <br />
            <button className="edit-button" onClick={editMeal}>
                Edit Meal Details
            </button>



        </div>
    );
}

export default MealDetail

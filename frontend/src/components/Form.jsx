import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"

function Form({route, method}){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const val = method == "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try { 
            const req = await api.post(route, {username, password} )
            if(method == "login") {
                localStorage.setItem(ACCESS_TOKEN, req.data.access);
                localStorage.setItem(REFRESH_TOKEN, req.data.refresh);
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }
        catch(error) {
            alert(error)
        }
        finally{
            setLoading(false);
        }


    }

    return (<form onSubmit={handleSubmit} className="form-container">
        <h1>{ val }</h1>
        <input 
            className="form-input"
            type="text"
            value= {username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        
        />

        <input 
            className="form-input"
            type="password"
            value= {password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passowrd"
        
        />

        <button className="form-button" type = "submit "> { val } </button>
        {val == "Login" && 
        <p>
            Dont Have An Account? Reigster<a className = "form-reg" href="/register">Here</a>
        </p>
        }
        {val == "Register" && 
        <p>
            Already Have An Account? Login<a className = "form-reg" href="/login">Here</a>
        </p>
        }

        

    </form>);
}

export default Form
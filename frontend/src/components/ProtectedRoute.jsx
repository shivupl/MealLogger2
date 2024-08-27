import {Navigate} from "react-router-dom"
import {jwtDecode} from "jwt-decode"
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"
import { useState, useEffect } from "react"



//check if authorized before accessing route
function ProtectedRoute({children}) {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])



    const refreshToken = async () => { //function to reset token automatically
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            //send req to backend with rt to get new at
            const response = await api.post("api/token/refresh/", {refresh: refreshToken});
            if(response.status == 200){
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch(error) {
            console.log(error)
            setIsAuthorized(false)

        }

    }

    const auth = async () => { //check if token needs to be refreshed
        const token = localStorage.getItem(ACCESS_TOKEN) //setting const token to accestoken
        if(!token){ //no token
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token) //automatically decodes token
        const tokenExp = decoded.exp
        const now = Date.now()/1000 //date in seconds

        if(tokenExp < now) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true) //token not expired
        }



    }

    if(isAuthorized == null) { //while checking tokens
        return <div>LOADING...</div>
    }

    return isAuthorized ? children : <Navigate to="/login" />

}

export default ProtectedRoute;
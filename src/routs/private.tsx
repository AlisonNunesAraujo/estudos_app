import NavStack from "./navstack";
import Home from "../pages/home";
import { useState } from "react";

import { useContext } from "react";
import {AuthContext }from "../contextxApi";


export default function Privado(){
    
    const {isAuth} = useContext(AuthContext)
    
    const [user,setUser] = useState(false)

    return(
        isAuth ? <Home/> : <NavStack/>
    )
}
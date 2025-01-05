import NavStack from "./navstack";
import Nav from "./nav";
import { useState } from "react";

import { useContext } from "react";
import {AuthContext }from "../contextApi";


export default function Privado(){
    
    const {isAuth} = useContext(AuthContext)
    
    const [user,setUser] = useState(false)

    return(
        isAuth ? <Nav/> : <NavStack/>
    )
}
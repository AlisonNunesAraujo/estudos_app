import NavStack from "./navstack";
import Nav from "./nav";

import { useContext } from "react";
import {AuthContext }from "../contextApi";

export default function Privado(){
    
    const {isAuth} = useContext(AuthContext)

    return(
        isAuth ? <Nav/> : <NavStack/>
    )
}
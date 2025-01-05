import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Home from "../pages/home";
import AddTrilha from "../pages/addTrilha";
import EditarTrilha from "../pages/editarTrilha";

 export type StackParamlist = {
    Home: undefined;
    AddTrilha: undefined;
    EditarTrilha: undefined;
}


const Stack = createNativeStackNavigator<StackParamlist>();



export default function Nav(){

    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false }}/>
            <Stack.Screen name="AddTrilha" component={AddTrilha} options={{headerShown: false}}/>
            <Stack.Screen name="EditarTrilha" component={EditarTrilha}/>
        </Stack.Navigator>
    )
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/home";
import AddTrilha from "../pages/addTrilha";
import EditarTrilha from "../pages/editarTrilha";
import RenderTrilha from "../components/renderTrilha";

export type StackParamlist = {
  Home: undefined;
  AddTrilha: undefined;
  EditarTrilha: {
    trilha: string;
    nome: string;
  };
};

const Stack = createNativeStackNavigator<StackParamlist>();

export default function Nav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddTrilha"
        component={AddTrilha}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditarTrilha"
        component={EditarTrilha}
        options={{ title: "Sua trilha" }}
      />
    </Stack.Navigator>
  );
}

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SingIn from "../pages/singIn";
import SingOut from "../pages/singOut";

export type StackParamlist = {
  SingIn: undefined;
  SingOut: undefined;
};

const Stack = createNativeStackNavigator<StackParamlist>();

export default function NavStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SingIn"
        component={SingIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SingOut"
        component={SingOut}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

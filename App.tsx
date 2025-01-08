import { NavigationContainer } from "@react-navigation/native";
import Privado from "./src/routs/private";
import AuthProvider from "./src/contextApi";

import FlashMessage from "react-native-flash-message";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Privado />
        <FlashMessage position="top" />
      </AuthProvider>
    </NavigationContainer>
  );
}

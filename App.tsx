import { NavigationContainer } from "@react-navigation/native";
import Privado from "./src/routs/private";
import AuthProvider from "./src/contextxApi";
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Privado />
      </AuthProvider>
    </NavigationContainer>
  );
}

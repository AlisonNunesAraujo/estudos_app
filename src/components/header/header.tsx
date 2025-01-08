import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import Feather from "@expo/vector-icons/Feather"
import { AuthContext } from "../../contextApi";

export default function Header() {
  const { user, LogOut } = useContext(AuthContext);

  async function Sair() {
    LogOut({ user: false });
  }

  return (
    <View style={s.container}>
      <View style={s.area}>
        <Text style={s.textEmail}>Email: {user.email}</Text>
        <TouchableOpacity style={s.icon} onPress={Sair}>
          <Feather name='log-out' color='black' size={25}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    backgroundColor: "white",
    justifyContent: "center",
    boxShadow: "1px 1px 8px 1px",
    position: "static",
  },
  area: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textEmail: {
    fontSize: 14,
    color: "black",
    marginLeft: 20,
    fontFamily: "Arial",
    fontWeight: "800",
  },
  icon: {
    marginRight: 30,
  },
});

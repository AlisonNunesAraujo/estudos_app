import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";

import { AuthContext } from "../../contextApi";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <View style={s.container}>
      <View>
        <Text style={s.textEmail}>Email: {user.email}</Text>
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
    boxShadow: "0px 2px 10px 0px",
  },
  textEmail: {
    fontSize: 15,
    color: "black",
    marginLeft: 20,
    fontFamily: "Arial",
    fontWeight: "800",
  },
});

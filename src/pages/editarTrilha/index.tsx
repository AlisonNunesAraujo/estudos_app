import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";


type RouteEditarTrilhaProp = {
  EditarTrilha: {
    nome: string;
    trilha: string;
    uidtrilha: string;
  };
};

type EditarProp = RouteProp<RouteEditarTrilhaProp, "EditarTrilha">;

export default function EditarTrilha() {
  const route = useRoute<EditarProp>();

  
  return (
    <View style={s.conteiner}>
      <View style={s.areaInfo}>
        <Text style={s.title}>{route.params?.trilha}</Text>

        <View style={s.areaText}>
          <Feather color="red" size={25} name="award" />
          <Text style={s.text}>{route.params?.nome}</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "cinze",
  },
  areaInfo: {
    width: "100%",
    height: 300,
  },
  areaText: {
    width: "90%",
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    letterSpacing: 3,
  },

  text: {
    fontWeight: "600",
    fontFamily: "Arial",
    letterSpacing: 3,
    fontSize: 15,
  },
});

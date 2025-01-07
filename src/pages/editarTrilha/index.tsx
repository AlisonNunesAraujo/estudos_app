import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

type RouteEditarTrilhaProp = {
  EditarTrilha: {
    nome: string;
    trilha: string;
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
          <Text style={s.text}>
            <Text>=== </Text>
            {route.params?.nome}
          </Text>
        </View>

        <TouchableOpacity>
          <Text>Excluir dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "white",
  },
  areaInfo: {
    width: "100%",
    height: 300,
  },
  areaText: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
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
    marginLeft: 10,
  },
});

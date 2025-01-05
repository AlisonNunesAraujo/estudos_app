import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import Header from "../../components/header/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();

  return (
    <View>
      <Header />
      <View style={s.areaTrilha}>
        <Text style={s.textTrilha}>Trilha de estudos</Text>

        <View>
          <TouchableOpacity
            style={s.bntTrilha}
            onPress={() => navigation.navigate("AddTrilha")}
          >
            <Text style={s.textbntTrilha}>Adicionar trilha de estudos!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  areaTrilha: {
    marginTop: 20,
    borderWidth: 1,
    gap: 20,
  },

  textTrilha: {
    fontSize: 20,
    marginLeft: 10,
    fontFamily: "Arial",
    fontWeight: "700",
  },
  bntTrilha: {
    padding: 10,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textbntTrilha: {
    fontFamily: "Arial",
    fontWeight: "700",
    color: "white",
  },
});

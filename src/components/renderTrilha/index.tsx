import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";
import Feather from "@expo/vector-icons/Feather";
import { useContext } from "react";
import { AuthContext } from "../../contextApi";
import * as Animatable from "react-native-animatable";
import { TrilhaProps } from "../../contextApi/types";

type RenderTrilhaProps = {
  trilha: TrilhaProps;
};

export default function RenderTrilha({ trilha }: RenderTrilhaProps) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();
  const { Apagar, loading } = useContext(AuthContext);

  async function Delete() {
    Apagar(trilha.uidtrilha);
  }

  return (
    <Animatable.View animation={"fadeInDown"}>
      <TouchableOpacity
        style={s.bnt}
        onPress={() =>
          navigation.navigate("EditarTrilha", {
            nome: trilha.nome,
            trilha: trilha.trilha,
          })
        }
      >
        <Text style={s.title}>{trilha.nome}</Text>
        <TouchableOpacity onPress={Delete} style={s.bntDelete}>
          {loading ? (
            <ActivityIndicator color="black" size={20} />
          ) : (
            <Feather name="trash-2" color="black" size={25} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const s = StyleSheet.create({
  bnt: {
    width: 120,
    height: 130,
    backgroundColor: "#fff3ff",
    margin: 13,
    borderRadius: 5,
    boxShadow: "0px 2px 0px 0px ",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 30,
    marginLeft: 10,
    fontFamily: "Arial",
  },
  bntDelete: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textBntDelete: {
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Arial",
  },
});

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";

export default function RenderTrilha({ trilha, nome } : {trilha : string, nome : string,}) {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();

  return (
    <TouchableOpacity
      style={s.bnt}
      onPress={() => navigation.navigate("EditarTrilha", { trilha, nome})}
    >
      <Text style={s.title}>{trilha}</Text>
      
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  bnt: {
    width: 130,
    height: 130,
    backgroundColor: "white",
    margin: 13,
    borderRadius: 5,
    boxShadow: "0px 2px 0px 0px ",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 20,
    marginLeft: 10,
  },
});

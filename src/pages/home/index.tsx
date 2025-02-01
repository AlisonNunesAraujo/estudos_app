import { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "react-native";
import * as Animatable from 'react-native-animatable'
import Feather from "@expo/vector-icons/Feather";

import Header from "../../components/header/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";
import { useNavigation } from "@react-navigation/native";

import RenderTrilha from "../../components/renderTrilha";
import { AuthContext } from "../../contextApi";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();

  const { dados } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header />
      <Animatable.View animation={'fadeInDown'} style={s.areaTrilha}>
        <Text style={s.textTrilha}>Trilha de estudos</Text>

        <View style={s.areaAdd}>
          <TouchableOpacity
            style={s.bntTrilha}
            onPress={() => navigation.navigate("AddTrilha")}
          >
            <Feather name="file-plus" color="black" size={25} />
          </TouchableOpacity>
        </View>
      </Animatable.View>

      <FlatList
        style={s.flat}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={dados}
        renderItem={({ item }) => <RenderTrilha trilha={item} />}
      />



    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  areaTrilha: {
    width: "100%",
    height: "20%",
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Arial",
  },

  textTrilha: {
    fontSize: 30,
    marginLeft: 30,
    fontFamily: "Arial",
    fontWeight: "700",
  },
  areaAdd: {
    width: "20%",
    height: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  bntTrilha: {
    width: "50%",
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  textbntTrilha: {
    fontFamily: "Arial",
    fontWeight: "700",
    color: "black",
    fontSize: 20,
  },

  flat: {
    width: "100%",
    marginTop: 40,
  },

  areaInfo: {
    width: "100%",
    padding: 15,
  },

  infoTitle: {
    fontWeight: "600",
  },
  infoText: {
    fontWeight: "300",
    letterSpacing: 3,
    opacity: 0.6,
    fontFamily: "Arial",
  },
});

import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import Header from "../../components/header/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";
import { useNavigation } from "@react-navigation/native";
import { getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConection";
import { collection } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import RenderTrilha from "../../components/renderTrilha";


interface type {
  trilha: string;
  nome: string;
}

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();
  const [dados, setDados] = useState<type[]>([]);
  const focused = useIsFocused();

  useEffect(() => {
    async function RendleDados() {
      const response = collection(db, "trilha");

      getDocs(response).then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            trilha: doc.data().trilha,
            nome: doc.data().nomeTrilha,
          });

          setDados(lista);
        });
      });
    }

    RendleDados();
  }, [focused]);

  return (
    <View>
      <Header />
      <View style={s.areaTrilha}>
        <Text style={s.textTrilha}>Trilha de estudos</Text>

        <View style={s.areaAdd} >
          <TouchableOpacity
            style={s.bntTrilha}
            onPress={() => navigation.navigate("AddTrilha")}
          >
            <Text style={s.textbntTrilha}>Adicionar trilha de estudos!</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={s.flat}
        horizontal={true}
        data={dados}
        renderItem={({ item }) => (
          <RenderTrilha trilha={item.trilha} nome={item.nome} />
        )}
      />

    </View>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
  },
  areaTrilha: {
    width: '100%',
    height: 150,
    marginTop: 20,
    gap: 20,
  },

  textTrilha: {
    fontSize: 25,
    marginLeft: 30,
    fontFamily: "Arial",
    fontWeight: "700",
    
  },
  areaAdd:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
  },
  bntTrilha: {
    width: '50%',
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

  flat:{
    width: '100%',
    marginTop: 40,
  }
});

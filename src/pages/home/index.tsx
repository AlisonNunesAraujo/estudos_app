import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "react-native";

import Feather from '@expo/vector-icons/Feather'

import Header from "../../components/header/header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamlist } from "../../routs/nav";
import { useNavigation } from "@react-navigation/native";
import { getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConection";
import { collection } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";
import RenderTrilha from "../../components/renderTrilha";
import { deleteDoc } from "firebase/firestore";


interface type {
  trilha: string;
  nome: string;
  uidtrilha: string;
}

type id = {
  uidtrilha: string;
}

import { useContext } from "react";
import { AuthContext } from "../../contextApi";

export default function Home() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();
  const [dados, setDados] = useState<type[]>([]);


  useEffect(() => {
    async function RendleDados() {
      const response = collection(db, "trilha");

      getDocs(response).then((snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            trilha: doc.data().trilha,
            nome: doc.data().nomeTrilha,
            uidtrilha: doc.id
          });

          setDados(lista);
        });
      });
    }

    RendleDados();
  }, [dados]);


 

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Header />
      <View style={s.areaTrilha}>
        <Text style={s.textTrilha}>Trilha de estudos</Text>
      
        <View style={s.areaAdd}>
          <TouchableOpacity 
            style={s.bntTrilha}
            
            onPress={() => navigation.navigate("AddTrilha")}
          >
            <Feather name='file-plus' color='black' size={25}/>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={s.flat}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={dados}
        renderItem={({ item }) => (
          <RenderTrilha trilha={item.trilha} nome={item.nome} uidtrilha={item.uidtrilha}/>
        )}
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
    fontFamily: 'Arial'
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
    backgroundColor: 'white',
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
});

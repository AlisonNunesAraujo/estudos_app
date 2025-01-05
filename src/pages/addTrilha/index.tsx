import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";


import { useContext } from "react";
import { AuthContext } from "../../contextApi";

export default function AddTrilha() {
  const { AddTrilha } = useContext(AuthContext);
  const navigation = useNavigation();
  const [trilha, setTrilha] = useState("");

  async function Mandar() {
    if (trilha == "") {
      alert("o campo é obrigatorio");
      return;
    }
    AddTrilha({ trilha });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={s.conteiner}>
        <View>
          <TouchableOpacity style={s.bntVoltar} onPress={()=> navigation.goBack()}>
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
        <View style={s.form}>
            
                <Text style={s.title}>Adicione algo na sua trilha de estudos!</Text>
                <TextInput
                  placeholder="Titulo da sua trilha"
                  placeholderTextColor="green"
                  value={trilha}
                  onChangeText={setTrilha}
                  style={s.input}
                />
                <TouchableOpacity onPress={Mandar} style={s.bntSalvar}>
                  <Text style={s.textBnt}>Salvar</Text>
                </TouchableOpacity>
             
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "white",
  },
  form: {
    width: "100%",
    height: 350,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "serif",
    marginTop: 50,
  },

  input: {
    width: "90%",
    height: 40,
    boxShadow: "0px 0px 0px 1px black",
    padding: 10,
    borderRadius: 5,
    color: "black",
  },
  bntSalvar: {
    width: "40%",
    padding: 10,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 10,
  },
  textBnt: {
    color: "white",
    fontFamily: "Arial",
    fontWeight: "700",
  },
  bntVoltar:{
    width: '30%',
    height: 40,
    marginLeft: 15,
    marginTop: 20,
    justifyContent: 'center',
  }
});

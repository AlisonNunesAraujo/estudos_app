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
  ActivityIndicator
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { showMessage } from 'react-native-flash-message'
import Feather from '@expo/vector-icons/Feather'

import { useContext } from "react";
import { AuthContext } from "../../contextApi";

export default function AddTrilha() {

  const { AddTrilha, loading } = useContext(AuthContext);

  const navigation = useNavigation();
  const [trilha, setTrilha] = useState("");
  const [nomeTrilha, setNometrilha] = useState("");

  async function Mandar() {
    if (trilha === "" && nomeTrilha === "") {
      showMessage({
        message: 'Preencha todos os campos',
        type: 'warning',
        duration: 2000,
      })
      return
    }
    AddTrilha({ trilha, nomeTrilha });
    setTrilha('')
    setNometrilha('')
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={s.conteiner}>
        <View>
          <TouchableOpacity
            style={s.bntVoltar}
            onPress={() => navigation.goBack()}
          >
            <Feather name='chevron-left' color='black' size={30} />

          </TouchableOpacity>
        </View>
        <View style={s.form}>
          <Text style={s.title}>Adicione algo na sua trilha de estudos!</Text>


          <TextInput
            placeholder="Nome da sua trilha"
            placeholderTextColor="black"
            value={nomeTrilha}
            onChangeText={setNometrilha}
            style={s.input}
          />

          <TextInput
            placeholder="Conteudo"
            placeholderTextColor="black"
            value={trilha}
            onChangeText={setTrilha}
            style={s.input}
          />

          <TouchableOpacity onPress={Mandar} style={s.bntSalvar}>
            {loading ? (
              <ActivityIndicator color='white' size={20} />
            ) : (
              <Text style={s.textBnt}>Salvar</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "cinze",
  },
  form: {
    width: "100%",
    height: 350,
    backgroundColor: "cinze",
    alignItems: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "Arial",
    marginTop: 50,
  },

  input: {
    width: "90%",
    height: 40,
    boxShadow: "0px 2px 6px 0px",
    padding: 10,
    borderRadius: 5,
    color: "black",
    margin: 10,
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
  bntVoltar: {
    width: "10%",
    height: 40,
    marginLeft: 15,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },


});

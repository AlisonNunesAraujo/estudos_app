import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { StatusBar } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contextApi";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

import { showMessage } from 'react-native-flash-message'

export default function SingOut() {
  const { singOut, loading } = useContext(AuthContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Criar() {
    if (email == "" && senha == "") {
      showMessage({
        message: 'Preencha todos os campos',
        type: 'warning',
        duration: 3000
      })
    }
    singOut({ email, senha });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={s.conteiner}>
        <StatusBar backgroundColor='white' barStyle={"dark-content"} />
        <View style={s.form}>
          <Text style={s.title}>Faça seu cadastro!</Text>

          <TextInput
            placeholder="E-Mail"
            value={email}
            onChangeText={setEmail}
            style={s.inputs}
          />
          <TextInput
            placeholder="Senha"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            style={s.inputs}
          />

          <TouchableOpacity style={s.bnts} onPress={Criar}>
            {loading ? (
              <ActivityIndicator size={20} color="white" />
            ) : (
              <Text style={s.text}>Fazer cadastro</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={s.bnts} onPress={() => navigation.goBack()}>
            <Text style={s.text}>Voltar</Text>
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
    height: '100%',
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    boxShadow: '0px 0px 8px 0px',
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
    fontFamily: "Arial",
  },

  inputs: {
    width: "70%",
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 15,
    boxShadow: '0px 1px 0px 0px'
  },
  bnts: {
    width: "50%",
    height: 40,
    backgroundColor: "gray",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: 'Arial',
    color: 'white'
  }
});

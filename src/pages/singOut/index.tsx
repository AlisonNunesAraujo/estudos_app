import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { StatusBar } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../../contextApi";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function SingOut() {
  const { singOut } = useContext(AuthContext);

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Criar() {
    if (email == "" && senha == "") {
      alert("Preencha todos os campos");
      return;
    }
    singOut({ email, senha });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={s.conteiner}>
        <StatusBar backgroundColor='blue' barStyle={"light-content"}/>
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
            value={senha}
            onChangeText={setSenha}
            style={s.inputs}
          />

          <TouchableOpacity style={s.bnts} onPress={Criar}>
            <Text style={s.text}>Fazer cadastro</Text>
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
    backgroundColor: "#fff",
  },

  form: {
    width: "100%",
    height: 350,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    borderEndEndRadius: 18,
    borderStartEndRadius: 18,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    fontFamily: "serif",
  },

  inputs: {
    width: "70%",
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
  },
  bnts: {
    width: "50%",
    height: 40,
    backgroundColor: "green",
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text:{
    fontFamily: 'Arial',
    color:'white'
  }
});

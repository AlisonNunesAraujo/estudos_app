import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";

import * as Animatable from 'react-native-animatable'


import { StatusBar } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contextApi";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackParamlist } from "../../routs/navstack";

import { showMessage} from 'react-native-flash-message'

export default function SingIn() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamlist>>();

  const { singIn,loading } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function Logar() {
    if(email === '' && senha === ''){
      showMessage({
        message: 'Preencha todos os campos',
        type: 'warning',
        duration: 3000,
      })
      return
    }
    singIn({ email, senha });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={s.conteiner}>
        <StatusBar backgroundColor="white" barStyle={"dark-content"} />
        <Animatable.View animation={"fadeInDown"} style={s.form}>
          <Text style={s.title}>Entre na sua conta!</Text>

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

          <TouchableOpacity style={s.bnts} onPress={Logar}>
           {loading ? (
            <ActivityIndicator size={20} color="white" />
          ): (
            <Text style={s.text}>Acessar</Text>
          )}
          </TouchableOpacity>

          <TouchableOpacity
            style={s.bnts}
            onPress={() => navigation.navigate("SingOut")}
          >
            <Text style={s.text}>Fazer cadastro</Text>
          </TouchableOpacity>
        </Animatable.View>

        <View style={s.areaBemVindo}>
         <Animatable.Text animation={'fadeInDown'} style={s.textBemVindo}>Bem Vindo!</Animatable.Text>
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
    borderEndEndRadius: 28,
    borderStartEndRadius: 28,
    boxShadow: '0px 0px 8px 0px',
  },
  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: "Arial",
    letterSpacing: 2,
  },

  inputs: {
    width: "80%",
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 15,
    boxShadow:  '0px 1px 4px 0px'
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
    fontFamily: "Arial",
    color: "white",
  },
  areaBemVindo:{
    flex: 1,
    alignItems: "center",
  },
  textBemVindo:{
    fontSize: 55,
    fontFamily: 'cursive',
    marginTop: '20%',
  }

});

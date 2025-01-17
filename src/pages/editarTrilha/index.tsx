import { View, Text, StyleSheet,ScrollView} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import Feather from "@expo/vector-icons/Feather";

type RouteEditarTrilhaProp = {
  EditarTrilha: {
    nome: string;
    trilha: string;
    uidtrilha: string;
  };
};

type EditarProp = RouteProp<RouteEditarTrilhaProp, "EditarTrilha">;

export default function EditarTrilha() {
  const route = useRoute<EditarProp>();

  return (
    <ScrollView style={s.conteiner}>
      <View style={s.areaInfo}>
        <Text style={s.title}>{route.params?.trilha}</Text>

        <View style={s.areaText}>
          <Feather color="red" size={25} name="clipboard" />
          <Text style={s.text}>{route.params?.nome}</Text>
        </View>
      </View>

      <View style={s.info}>
        <Feather color="black" size={20} name="info" />
        <Text style={s.infoText}>
          Ao concluir sua tarefa voçe pode excluir a trilha na pagina inicial!
        </Text>
      </View>

      <View style={s.informacao}>
              <Text style={s.infoTitle}>Nota</Text>
              <Text style={s.textInfo}>
                Esse aplicativo tem como intuito armazenar as trilhas de estudos para
                que não sejam esquecidas, sendo assim uma ferramenta de auxilio para
                os estudantes. Podendo adicionar uma trilha de estudos e deletar
                quando ja estiver visto todo o conteudo relacionado a trilha!
              </Text>
            </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "cinze",
  },
  areaInfo: {
    width: "100%",
    height: 'auto',
  },
  areaText: {
    width: "90%",
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    gap: 10,
    padding: 10,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 20,
    letterSpacing: 3,
  },

  text: {
    fontWeight: "600",
    fontFamily: "Arial",
    letterSpacing: 3,
    fontSize: 15,
  },

  info: {
    width: "auto",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  infoText: {
    fontSize: 15,
    opacity: 0.6,
  },
  informacao: {
    width: "100%",
    padding: 15,
  },

  infoTitle: {
    fontWeight: "600",
  },


  textInfo: {
    fontWeight: "300",
    letterSpacing: 3,
    opacity: 0.6,
    fontFamily: "Arial",
  },
});

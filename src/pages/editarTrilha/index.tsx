import { View, Text,StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

export default function EditarTrilha() {
  const route = useRoute();

  return (
    <View style={s.conteiner}>
      <Text style={s.title}>{route.params.trilha}</Text>
      <Text style={s.text}>{route.params.nome}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  conteiner:{
    flex: 1,
    backgroundColor: 'white',

  },
  title:{
    fontSize: 27,
    fontWeight: '700',
    marginLeft: 20,
    marginTop: 20,
    letterSpacing: 3,
  },

  text:{
    marginLeft: 40,
    marginTop: 20,
    fontWeight: '600',
    fontFamily: 'Arial',
    letterSpacing: 3
  }
})

import { createContext, useState, ReactNode, useEffect } from "react";

import { auth } from "../firebase/firebaseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConection";
import { collection } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({} as State);

type State = {
  user: states;
  isAuth: boolean;
  singOut: (info: functionSingIn) => Promise<void>;
  singIn: (info: functionSingIn) => Promise<void>;
  AddTrilha: (info: functionAdd) => Promise<void>;
  LogOut: (info: functionLogout) => Promise<void>;
  Apagar: (info: idTrilha) => Promise<void>;
};

type states = {
  email: null | string;
  uid: number | string | null;
};

type TypeProvider = {
  children: ReactNode;
};

type functionSingIn = {
  email: string;
  senha: string;
};

type functionAdd = {
  trilha: string | number;
  nomeTrilha: string | number;
};

type functionLogout = {
  user: boolean;
};

type idTrilha = {
  uidtrilha: string;
};

export default function AuthProvider({ children }: TypeProvider) {
  const [user, setUser] = useState<states>({
    email: "",
    uid: "",
  });
  const isAuth = !!user.email && !!user.uid;

  const navigation = useNavigation();

  useEffect(() => {
    async function SaveUser() {
      try {
        const user = await AsyncStorage.getItem("@user");
        if (user) {
          setUser(JSON.parse(user));
        }
      } catch (e) {
        alert("Algo deu errado");
      }
    }
    SaveUser();
  }, []);

  async function singOut({ email, senha }: functionSingIn) {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, senha);
      showMessage({
        message: "Conta criado!!",
        type: "success",
        duration: 2000,
      });
      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });

      const ver = {
        email: data.user.email,
        uid: data.user.uid,
      };

      await AsyncStorage.setItem("@user", JSON.stringify(ver));
    } catch {
      showMessage({
        message: "Erro ao cadastrar",
        type: "danger",
      });
    }
  }

  async function singIn({ email, senha }: functionSingIn) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      showMessage({
        message: "Bem vindo",
        type: "success",
      });
      setUser({
        email: response.user.email,
        uid: response.user.uid,
      });

      const ver = {
        email: response.user.email,
        uid: response.user.uid,
      };
      await AsyncStorage.setItem("@user", JSON.stringify(ver));
    } catch {
      showMessage({
        message: "Erro ao logar",
        type: "warning",
      });
    }
  }

  async function AddTrilha({ trilha, nomeTrilha }: functionAdd) {
    try {
      const response = await addDoc(collection(db, "trilha"), {
        trilha: trilha,
        nomeTrilha: nomeTrilha,
        uid: user.uid,
      });
      showMessage({
        message: "Trilha criada com sucesso",
        type: "success",
        duration: 2000,
      });
    } catch (err) {
      showMessage({
        message: "Erro ao criar trilha",
        type: "warning",
      });
    }
  }

  async function LogOut() {
    try {
      const data = await signOut(auth);
      AsyncStorage.clear();
      setUser({ email: "", uid: "" });
      showMessage({
        message: " Deslogado com sucesso",
        duration: 3000,
      });
    } catch {
      showMessage({
        message: "Ocorreu um erro!",
        duration: 2000,
        type: "danger",
      });
    }
  }

  async function Apagar({ uidtrilha }: idTrilha) {
    const data = doc(db, "trilha", uidtrilha);

    await deleteDoc(data)
      .then(() => {
        showMessage({
          message: "Trilha deletada com sucesso",
          type: "info",
          duration: 2000,
        });
      })
      .catch((err) => {
        showMessage({
          message: "Erro ao deletar trilha",
          duration: 2000,
        });
      });
  }

  return (
    <AuthContext.Provider
      value={{ isAuth, user, singOut, singIn, AddTrilha, LogOut, Apagar }}
    >
      {children}
    </AuthContext.Provider>
  );
}

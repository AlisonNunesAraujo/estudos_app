import { createContext, useState, ReactNode, useEffect } from "react";

import { auth } from "../firebase/firebaseConection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, query } from "firebase/firestore";
import { db } from "../firebase/firebaseConection";
import { collection, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { deleteDoc, getDocs } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { showMessage } from "react-native-flash-message";



export const AuthContext = createContext({} as State);

type State = {
  user: states;
  isAuth: boolean;
  dados: TrilhaProps[];
  singOut: (info: functionSingIn) => Promise<void>;
  singIn: (info: functionSingIn) => Promise<void>;
  AddTrilha: (info: functionAdd) => Promise<void>;
  LogOut: (info: functionLogout) => Promise<void>;
  Apagar: (idtrilha: string) => Promise<void>;
  loading: boolean;
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

export interface TrilhaProps {
  trilha: string;
  nome: string;
  uidtrilha: string;
}

export default function AuthProvider({ children }: TypeProvider) {
  const [user, setUser] = useState<states>({
    email: "",
    uid: "",
  });

  const [dados, setDados] = useState<TrilhaProps[]>([]);
  const [loading, setLoading] = useState(false);
  const isAuth = !!user.email && !!user.uid;

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

  useEffect(() => {
    async function RendleDados() {
      
      const response = collection(db, "trilha");
      const data = query(response, where("uid", "==", user.uid));
      const snapshot = await getDocs(data);
      let lista: TrilhaProps[] = [];

      snapshot.forEach((doc) => {
        lista.push({
          trilha: doc.data().trilha,
          nome: doc.data().nomeTrilha,
          uidtrilha: doc.id,
        });
      });
      setDados(lista);
    }

    RendleDados();
  }, [dados]);

  async function singOut({ email, senha }: functionSingIn) {
    setLoading(true);
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
      setLoading(false);

      await AsyncStorage.setItem("@user", JSON.stringify(ver));
    } catch {
      showMessage({
        message: "Erro ao cadastrar",
        type: "danger",
      });
      setLoading(false);
    }
  }

  async function singIn({ email, senha }: functionSingIn) {
    setLoading(true);
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
      setLoading(false);
      await AsyncStorage.setItem("@user", JSON.stringify(ver));
    } catch {
      showMessage({
        message: "Erro ao logar",
        type: "warning",
      });
      setLoading(false);
    }
  }

  async function AddTrilha({ trilha, nomeTrilha }: functionAdd) {
    setLoading(true);
    try {
      const response = await addDoc(collection(db, "trilha"), {
        trilha: trilha,
        nomeTrilha: nomeTrilha,
        uid: user.uid,
      });
      setLoading(false);
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
      setLoading(false);
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

  async function Apagar(uidtrilha: string) {
    setLoading(true);
    const data = doc(db, "trilha", uidtrilha);

    await deleteDoc(data)
      .then(() => {
        setDados((prevDados) =>
          prevDados.filter((item) => item.uidtrilha !== uidtrilha)
        );

        showMessage({
          message: "Trilha deletada com sucesso",
          type: "info",
          duration: 2000,
        });
        setLoading(false);
      })

      .catch((err) => {
        showMessage({
          message: "Erro ao deletar trilha",
          duration: 2000,
        });
        setLoading(false);
      });
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        singOut,
        singIn,
        AddTrilha,
        LogOut,
        Apagar,
        dados,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

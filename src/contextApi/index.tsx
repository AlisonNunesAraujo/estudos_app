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

export const AuthContext = createContext({} as State);

type State = {
  user: states;
  isAuth: boolean;
  singOut: (info: functionSingIn) => Promise<void>;
  singIn: (info: functionSingIn) => Promise<void>;
  AddTrilha: (info: functionAdd) => Promise<void>
  LogOut: (info: functionLogout) => Promise<void> 

};

type states = {
  email: null | string;
  uid: number | string;
};

type TypeProvider = {
  children: ReactNode;
};

type functionSingIn = {
  email: string;
  senha: string;
};

type functionAdd = {
  trilha: string|number,
  nomeTrilha: string|number;
}

type functionLogout = {
  user: boolean,
}

export default function AuthProvider({ children }: TypeProvider) {
  const [user, setUser] = useState<states>({
    email: "",
    uid: "",
  });
  const isAuth = !!user.email && !!user.uid;

  useEffect(() => {
    async function SaveUser() {
      try {
        const user = await AsyncStorage.getItem("user");
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
      alert("ok");
      setUser({
        email: data.user.email,
        uid: data.user.uid,
      });

      const ver = {
        email: data.user.email,
        uid: data.user.uid,
      };

      await AsyncStorage.setItem("user", JSON.stringify(ver));
    } catch {
      alert("erro");
    }
  }

  async function singIn({ email, senha }: functionSingIn) {
    try {
      const response = await signInWithEmailAndPassword(auth, email, senha);
      alert("ok");
      setUser({
        email: response.user.email,
        uid: response.user.uid,
      });

      const ver = {
        email: response.user.email,
        uid: response.user.uid,
      };
      await AsyncStorage.setItem("user", JSON.stringify(ver));
    } catch {
      alert("erro");
    }
  }


  async function AddTrilha({trilha, nomeTrilha} : functionAdd){
    try{
      const response = await addDoc(collection(db, "trilha"), {
        trilha: trilha,
        nomeTrilha: nomeTrilha,
        uid: user.uid
      })
      alert('okk')
    }
    catch(err){
      alert('erro')
    }
  }

  async function LogOut(){
   try{
    const data = await signOut(auth)
    AsyncStorage.clear('user')
  
    alert('saiu da conta')

   }
   catch{
    alert('erro')
   }
  }


  return (
    <AuthContext.Provider value={{ isAuth, user, singOut, singIn,AddTrilha,LogOut }}>
      {children}
    </AuthContext.Provider>
  );
}

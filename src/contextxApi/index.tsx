import { createContext, useState, ReactNode } from "react";

import { auth } from "../firebase/firebaseConection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

type State = {
  user: states;
  isAuth: boolean;
  singOut: (info: functionSingIn) => Promise<void>;
  singIn: (info : functionSingIn) => Promise<void>
};

type states = {
  email: string;
  uid: string | number;
};

export const AuthContext = createContext({} as State);

type TypeProvider = {
  children: ReactNode;
};


type functionSingIn = {
  email:  string;
  senha: string;
}


type userDate = {
  email: string;
  uid: string | number;
}

export default function AuthProvider({ children }: TypeProvider) {
  const [user, setUser] = useState<states>({
    email: "",
    uid: "",
  });

  const isAuth = !!user.email && !!user.uid;

 

  async function singOut({email,senha}: functionSingIn){
    try{
        const data = await createUserWithEmailAndPassword(auth,email,senha)
        alert('ok')
        setUser(data.user)
    }
    catch{
        alert('erro')
    }
  }

  async function singIn({email,senha}: functionSingIn){
    try{
        const response = await signInWithEmailAndPassword(auth,email,senha)
        alert('ok')
        setUser(response.user)
    }
    catch{
        alert('erro')
    }
  }


  return (
    <AuthContext.Provider value={{ isAuth, user, singOut,singIn}}>
      {children}
    </AuthContext.Provider>
  );
}

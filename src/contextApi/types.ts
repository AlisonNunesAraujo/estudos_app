import { ReactNode } from "react";


export type State = {
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


export type states = {
  email: null | string;
  uid: number | string | null;
};

export type TypeProvider = {
  children: ReactNode;
};

export type functionSingIn = {
  email: string;
  senha: string;
};

export type functionAdd = {
  trilha: string | number;
  nomeTrilha: string | number;
};

export type functionLogout = {
  user: boolean;
};

export type idTrilha = {
  uidtrilha: string;
};

export interface TrilhaProps {
  trilha: string;
  nome: string;
  uidtrilha: string;
}

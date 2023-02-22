import React from "react";
import { ICharacter } from "./apis";

export type User = {
    email: string,
    userName: string,
    characters: Array<ICharacter>,
    jwt: string,
    pfpUrl: string,

}
type GlobalContent = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export const GlobalContext = React.createContext<GlobalContent>({
    user: null,
    setUser: () => { }
})

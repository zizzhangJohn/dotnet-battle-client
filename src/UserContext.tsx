import React from "react";
import { ICharacter } from "./apis";

export type User = {
    email: string,
    userName: string,
    characters?: Array<ICharacter>
    jwt: string
}
type GlobalContent = {
    user: User | null,
    setUser: (u: User) => void
}

export const GlobalContext = React.createContext<GlobalContent>({
    user: null,
    setUser: () => { }
})

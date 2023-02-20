import axios from "axios";
const API_URL: string = import.meta.env.VITE_API_URL;

interface IUserResponse {
  data: {
    userName: string;
    email: string;
    characters: Array<ICharacter>
  };
  message: string;
  success: boolean;
}

enum CharacterType {
  Knight = "Knight",
  Mage = "Mage",
  Cleric = "Cleric",
}
export interface ICharacter {
  id: number;
  name: string;
  hitPoints: number;
  strength: number;
  defense: number;
  characterType: CharacterType;
  characterWeapon: ICharacterWeapon
}

interface ICharacterWeapon{
    name: string;
    damage: number; 
}

export async function getUserInfo(jwt: string) {
  const headers = { Authorization: "bearer " + jwt };
  const axiosWithCrentials = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });
  try {
    return await axiosWithCrentials.get<IUserResponse>("/Auth/GetUser", {
      headers,
    });
  } catch (error) {
    if (import.meta.env.DEV) {
      if (axios.isAxiosError(error)) {
        console.log("axios error: ", error.message);
      } else {
        console.log("unexpected error: ", error);
      }
    }
    throw error;
  }
}

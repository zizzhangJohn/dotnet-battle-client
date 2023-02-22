import axios from "axios";
const API_URL: string = import.meta.env.VITE_API_URL;

interface IUserResponse {
  data: {
    userName: string;
    email: string;
    characters: Array<ICharacter>;
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
  characterWeapon: ICharacterWeapon;
}

interface ICharacterWeapon {
  name: string;
  damage: number;
}

interface IAddOneCharacterResponse {
  data: Array<ICharacter>;
  message: string;
  success: boolean;
}
interface IDeleteOneCharacterResponse {
  data: Array<ICharacter>;
  message: string;
  success: boolean;
}
interface IFightResultResponse {
  data: {
    log: Array<string>;
  };
  message: string;
  success: boolean;
}

export async function getUserInfo(jwt: string) {
  const headers = { Authorization: "bearer " + jwt };
  const axiosWithCredentials = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });
  try {
    return await axiosWithCredentials.get<IUserResponse>("/Auth/GetUser", {
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

export async function addCharacter(jwt: string, name: string, type: string) {
  try {
    if (!(type in CharacterType)) {
      throw "character type is invalid";
    }
    const headers = { Authorization: "bearer " + jwt };
    const requestBody = {
      name: name,
      characterType: type,
    };
    const axiosWithCredentials = axios.create({
      baseURL: API_URL,
      withCredentials: true,
    });
    return await axiosWithCredentials.post<IAddOneCharacterResponse>(
      "/Character/AddOne",
      requestBody,
      {
        headers,
      }
    );
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

export async function deleteCharacter(jwt: string, id: number) {
  const headers = { Authorization: "bearer " + jwt };
  const axiosWithCrentials = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });
  try {
    return await axiosWithCrentials.delete<IDeleteOneCharacterResponse>(
      `/Character/${id}`,
      {
        headers,
      }
    );
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

export async function requestFight(jwt: string, ids: number[]) {
  const headers = { Authorization: "bearer " + jwt };
  const axiosWithCredentials = axios.create({
    baseURL: API_URL,
    withCredentials: true,
  });

  try {
    return await axiosWithCredentials.get<IFightResultResponse>(
      `/Fight?${ids.map((n) => `CharacterIds=${n}`).join('&')}`,
      {
        headers,
      },
    );
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

import jwtDecode from "jwt-decode";
import { useContext, useEffect } from "react";
import { getUserInfo } from "../../../apis";
import { GlobalContext, User } from "../../../GlobaContext";
import { useNavigate } from "react-router-dom";

export interface IGoogleJwtPayload {
    picture: string
}


const useGoogleAuthInitialization = () => {
    const {setUser } = useContext(GlobalContext);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("initilize auth")
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GCLIENT_ID,
            callback: handleGoogleCallback,
        });
    }, [])
    async function handleGoogleCallback(response: google.accounts.id.CredentialResponse) {
        const jwtPayload: IGoogleJwtPayload = jwtDecode(response.credential);
        const pfpUrl = jwtPayload.picture
        try {
            const getUserResponse = (await getUserInfo(response.credential)).data;
            if (import.meta.env.DEV) {
                console.log(getUserResponse.data)
                console.log("bearer " + response.credential)
            }
            const loginUser: User = {
                userName: getUserResponse.data.userName,
                email: getUserResponse.data.email,
                jwt: response.credential,
                characters: getUserResponse.data.characters,
                pfpUrl: pfpUrl
            }

            setUser(loginUser);
            navigate("/fight");

        } catch (error) {
            if (import.meta.env.DEV) {
                console.log("getUser Error: ", error)
            }
        }

    }
}
export default useGoogleAuthInitialization;
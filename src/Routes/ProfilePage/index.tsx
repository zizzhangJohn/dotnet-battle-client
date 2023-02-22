import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import { GlobalContext, User } from "../../GlobaContext";
import Image from 'react-bootstrap/Image'
import { LogoutModal } from "../../Components/LogoutModal";
import jwtDecode from "jwt-decode";
import { getUserInfo } from "../../apis";
import { useNavigate } from "react-router-dom";

interface IGoogleJwtPayload {
    picture: string
}
export function ProfilePage() {
    const { user, setUser } = useContext(GlobalContext);
    const [logOutModalShow, setLogOutModalShow] = useState(false);
    const navigate = useNavigate();

    function googleLoginButtonLoader() {
        // #signInDiv element is conditionally rendered
        // check null before render it
        const button = document.getElementById("signInDiv");
        if (button) {
            google.accounts.id.renderButton(
                button,
                {
                    type: "standard",
                    theme: "outline",
                    size: "large",
                    text: "signin_with"
                }
            )
        }
    }
    /*
    google oauth initialization
    can only call once
  */
    useEffect(() => {
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
    /*
    re-render button on user login logout
    */
    useEffect(() => {
        try {
            googleLoginButtonLoader();
        } catch (error) {
            if (import.meta.env.DEV && error instanceof ReferenceError) {
                console.log("reference error caught: ", error)
            }
            console.log("other errors from login button rendering: ", error)
        }
    }, [user])
    function pageContent() {
        if (!user) {
            return (
                <>
                    <div className="mx-auto">please sign in with google to use the app</div>
                    <div className="mx-auto" id="signInDiv"></div>
                </>
            )
        }
        return (
            <>
                <Image src={user.pfpUrl} roundedCircle className="mx-auto col-5 col-md-3" />
                <div className="mx-auto">{user.userName}</div>
                <div className="mx-auto col-10 col-md-6 d-flex justify-content-between"><span>Total Characters:</span><span>{user.characters ? user.characters.length : 0}</span></div>
                <Button className="mx-auto col-10 col-md-6 " variant="secondary" onClick={() => setLogOutModalShow(true)}>Sign out</Button>
                <LogoutModal show={logOutModalShow} setLogOutModalShow={setLogOutModalShow} setUser={setUser} />
            </>
        )
    }

    return (
        <Container className='vh-100 d-flex'>
            <Stack gap={2} className="col-md-5 mx-auto align-self-center fs-4" >
                {pageContent()}
            </Stack>
        </Container >
    )
}
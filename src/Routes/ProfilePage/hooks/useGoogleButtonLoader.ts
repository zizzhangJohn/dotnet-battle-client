import { useContext, useEffect } from "react";
import { GlobalContext } from "../../../GlobaContext";

const useGoogleButtonLoader = () => {
    const { user } = useContext(GlobalContext);
    useEffect(() => {
        console.log("load button")
        try {
            googleLoginButtonLoader();
        } catch (error) {
            if (import.meta.env.DEV && error instanceof ReferenceError) {
                console.log("reference error caught: ", error)
            }
            console.log("other errors from login button rendering: ", error)
        }
    }, [user])

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
}
export default useGoogleButtonLoader
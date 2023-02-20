import { useEffect, useContext } from 'react'
import { User, GlobalContext } from '../../UserContext';
import { getUserInfo } from '../../apis';

const LoginPage = () => {
  const { user, setUser } = useContext(GlobalContext);
  function googleAuthLoader() {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GCLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv")!,
      {
        type: "standard",
        theme: "outline",
        size: "large"
      }
    )
  }

  async function handleCallbackResponse(response: google.accounts.id.CredentialResponse) {
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
        characters: getUserResponse.data.characters
      }
      setUser(loginUser);
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log("getUser Error: ", error)
      }
    }

  }
  useEffect(() => {
    googleAuthLoader();
  }, [])
  return (
    <div>LoginPage

      <div id="signInDiv"></div>
      <div>{user ? user?.email : "please login"}</div>
    </div>
  )
}

export default LoginPage
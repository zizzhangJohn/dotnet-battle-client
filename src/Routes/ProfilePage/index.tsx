import { useContext, useState } from "react";
import { GlobalContext } from "../../GlobaContext";
import { LogoutModal } from "../../Components/LogoutModal";
import useGoogleAuthInitialization from "./hooks/useGoogleAuthInitialization";
import useGoogleButtonLoader from "./hooks/useGoogleButtonLoader";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";

function ProfilePage() {
  const { user, setUser } = useContext(GlobalContext);
  const [logOutModalShow, setLogOutModalShow] = useState(false);

  /*
   initialize google auth service
  */
  useGoogleAuthInitialization();

  /*
    re-render button on user login logout
  */
  useGoogleButtonLoader();

  function pageContent() {
    if (!user) {
      return (
        <>
          <div className="mx-auto">
            please sign in with google to use the app
          </div>
          {/* id="signInDiv" is specified for googlebutton rendering */}
          <div className="mx-auto" id="signInDiv"></div>
        </>
      );
    }
    return (
      <>
        <Image
          src={user.pfpUrl}
          roundedCircle
          className="mx-auto col-5 col-md-3"
        />
        <div className="mx-auto">{user.userName}</div>
        <div className="mx-auto col-10 col-md-6 d-flex justify-content-between">
          <span>Total Characters:</span>
          <span>{user.characters ? user.characters.length : 0}</span>
        </div>
        <Button
          className="mx-auto col-10 col-md-6 "
          variant="secondary"
          onClick={() => setLogOutModalShow(true)}
        >
          Sign out
        </Button>
        <LogoutModal
          show={logOutModalShow}
          setLogOutModalShow={setLogOutModalShow}
          setUser={setUser}
        />
      </>
    );
  }

  return (
    <Container className="vh-100 d-flex">
      <Stack gap={2} className="col-md-5 mx-auto align-self-center fs-4">
        {pageContent()}
      </Stack>
    </Container>
  );
}
export default ProfilePage;

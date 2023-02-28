import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <Container className="homePage-offset vh-100 d-flex flex-column justify-content-center">
      <h1 className="mx-auto">RPG battle simulator</h1>
      <p className="mx-auto text-center">
        A ReactTS + .Net project <br /> inspired by Dungeons & Dragons
      </p>
      <Button
        className="col-3 mx-auto mt-3"
        variant="dark"
        onClick={() => navigate("fight")}
      >
        Get started
      </Button>
    </Container>
  );
};

export default HomePage;

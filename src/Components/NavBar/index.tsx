import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../GlobaContext';
import { LogoutModal } from '../LogoutModal';

const NavBar = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [logOutModalShow, setLogOutModalShow] = useState(false);
  return (
    <Navbar className='fs-5' collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className='fs-3' as={NavLink} to="/">RPG-Battle</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="fight">Fight</Nav.Link>
            <Nav.Link as={NavLink} to="characters">Characters</Nav.Link>
            <Nav.Link as={NavLink} to="profile">Profile</Nav.Link>
          </Nav>
          <Nav>{user &&
            <Navbar.Text>
              Signed in as: <a href="#" onClick={() => setLogOutModalShow(true)}>{user.userName}</a>
              <LogoutModal show={logOutModalShow} setLogOutModalShow={setLogOutModalShow} setUser={setUser} />
            </Navbar.Text>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
import { useContext, useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../GlobaContext';
import { LogoutModal } from '../LogoutModal';

const NavBar = () => {
  const { user, setUser } = useContext(GlobalContext);
  const [logOutModalShow, setLogOutModalShow] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  /*
  click outside to close mobilemenu, excluding toggle
  */
  useEffect(() => {
    let mouseClickHandler = (e: MouseEvent) => {
      if (!toggleRef.current?.contains(e.target as Node) &&
        !mobileMenuRef.current?.contains(e.target as Node)) {
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", mouseClickHandler);
    return () => {
      document.removeEventListener("mousedown", mouseClickHandler);
    }
  })

  return (
    <Navbar className='fs-5' expanded={expanded} expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className='fs-3' as={NavLink} to="/">RPG-Battle</Navbar.Brand>
        <Navbar.Toggle onClick={() => setExpanded(pre => !pre)} aria-controls="responsive-navbar-nav" ref={toggleRef} />
        <Navbar.Collapse ref={mobileMenuRef}>
          <Nav className="me-auto" onClick={(e) => {
            e.stopPropagation();
            if (expanded) {
              setExpanded(false);
            }
          }}>
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
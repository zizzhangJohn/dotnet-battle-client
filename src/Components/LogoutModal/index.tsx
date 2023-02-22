import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { User } from '../../GlobaContext';

type props = {
    show: boolean,
    setLogOutModalShow: React.Dispatch<React.SetStateAction<boolean>>
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}


export function LogoutModal({ show, setLogOutModalShow, setUser }: props) {
    function handleLogout() {
        setUser(null);
        setLogOutModalShow(false);
    }
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className=".pt-2">
                <h4>Do you want to log out?</h4>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-column flex-sm-row justify-content-sm-between'>
                <Button className='col-12 col-sm-4' variant='danger' onClick={handleLogout}>Yes</Button>
                <Button className='col-12 col-sm-4' onClick={() => setLogOutModalShow(false)}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}
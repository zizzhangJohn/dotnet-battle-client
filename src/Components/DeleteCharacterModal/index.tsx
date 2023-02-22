import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ICharacter, deleteCharacter } from '../../apis';
import { GlobalContext, User } from '../../GlobaContext';

type props = {
    show: boolean,
    setDeleteCharacterModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    character: ICharacter | null
}


export function DeleteCharacterModal({ show, setDeleteCharacterModalShow, character }: props) {
    const { user, setUser } = useContext(GlobalContext);
    async function handleDelete() {
        setDeleteCharacterModalShow(false);
        try {
            const deleteCharacterResponse = (await deleteCharacter(user!.jwt, character!.id)).data
            const newUserState: User = JSON.parse(JSON.stringify(user));
            newUserState.characters = deleteCharacterResponse.data;
            setUser(newUserState)
        } catch (error) {
            if (import.meta.env.DEV) {
                console.log("Delete character error: ", error)
            }
        }
    }
    return (
        <Modal
            show={show}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body className=".pt-2">
                <h4>Do you want to delete {character ? character.name : "character is null"} ? </h4>
            </Modal.Body>
            <Modal.Footer className='d-flex flex-column flex-sm-row justify-content-sm-between'>
                <Button className='col-12 col-sm-4' onClick={handleDelete} variant="danger">Yes</Button>
                <Button className='col-12 col-sm-4' onClick={() => setDeleteCharacterModalShow(false)}>No</Button>
            </Modal.Footer>
        </Modal>
    );
}
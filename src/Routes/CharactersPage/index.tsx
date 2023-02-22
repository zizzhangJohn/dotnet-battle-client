import Table from "react-bootstrap/Table"
import Container from "react-bootstrap/Container"
import { GlobalContext, User } from "../../GlobaContext"
import { useContext, useState } from "react"
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { MdDeleteForever } from 'react-icons/md'
import { addCharacter, ICharacter } from "../../apis";
import { DeleteCharacterModal } from "../../Components/DeleteCharacterModal";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const CharactersPage = () => {
  const { user, setUser } = useContext(GlobalContext)
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    characterName: '',
    characterType: 'Knight',
  })
  const [characterToDelete, setCharacterToDelete] = useState<ICharacter | null>(null)
  const [deleteCharacterModalShow, setDeleteCharacterModalShow] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value })
  }
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);

    } else {
      if (import.meta.env.DEV) {
        console.log("Adding user: ", formData);
      }
      try {
        const addCharacterResponse = (await addCharacter(user!.jwt, formData.characterName, formData.characterType)).data
        const newUserState: User = JSON.parse(JSON.stringify(user));
        newUserState.characters = addCharacterResponse.data;
        setUser(newUserState)
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log("Error while adding character: ", error)
        }
      }
    }
  }
  function handleDelete(character: ICharacter) {
    setCharacterToDelete(character);
    setDeleteCharacterModalShow(true);
  }
  function tableContent() {
    if (!user!.characters) {
      return <tbody></tbody>
    }
    return (
      <tbody>
        {user!.characters.map(c =>
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.hitPoints}</td>
            <td>{c.strength}</td>
            <td>{c.defense}</td>
            <td>{c.characterType}</td>
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>{c.characterWeapon ? `Damage: ${c.characterWeapon.damage}` : "not equipped"}</Tooltip>}
            >
              <td className="text-primary" role="button">{c.characterWeapon ? c.characterWeapon.name : "No Weapon"}</td></OverlayTrigger>
            <td><MdDeleteForever onClick={() => handleDelete(c)} role="button" className="fs-4 text-danger" /></td>
          </tr>
        )}
      </tbody>
    )
  }
  return (
    <Container>
      <Form className="mt-4"
        noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCharacterName">
            <Form.Control
              name="characterName"
              required
              type="text"
              placeholder="Character Name"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a character name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCharacterType">
            <Form.Control
              name="characterType"
              required
              as="select"
              type="select"
              onChange={handleChange}
            >
              <option value="">Choose Character type...</option>
              <option value="Knight">Knight</option>
              <option value="Mage">Mage</option>
              <option value="Cleric">Cleric</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a type.
            </Form.Control.Feedback>
          </Form.Group>
          <Col><Button type="submit">Add</Button></Col>
        </Row>
      </Form>
      <Table striped responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>HitPoints</th>
            <th>Strength</th>
            <th>Defense</th>
            <th>Type</th>
            <th>Weapon</th>
            <th>Actions</th>
          </tr>
        </thead>
        {tableContent()}<DeleteCharacterModal show={deleteCharacterModalShow} setDeleteCharacterModalShow={setDeleteCharacterModalShow} character={characterToDelete} />
      </Table>
    </Container>
  )
}

export default CharactersPage
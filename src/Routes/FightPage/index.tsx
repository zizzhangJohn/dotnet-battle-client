import { useContext } from "react"
import { GlobalContext } from "../../GlobaContext"
import SelectInput from "./SelectInput"
import { GrPowerReset } from "react-icons/gr"
import Container from "react-bootstrap/Container"
import Stack from "react-bootstrap/Stack"


const FightPage = () => {
  const { fightResult,setFightResult } = useContext(GlobalContext)
  return (
    <Container className="vh-100">
      <Stack className="col-8 mx-auto h-100 mt-5" gap={1}>
      <SelectInput />
        <div className="d-flex align-items-center justify-content-between">
          <strong>Fight Result:</strong> <GrPowerReset role="button" size={25} onClick={() => setFightResult([])} /></div>
        <div className="border form-control h-50 overflow-auto">
          {fightResult.length > 0 ? fightResult.map((sentence, index) => (<p key={index}>{sentence}</p>)) : ""}
        </div>
      </Stack>
    </Container>
  )
}

export default FightPage
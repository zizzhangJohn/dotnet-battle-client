import { useContext, useState } from "react";
import { GlobalContext } from "../../GlobaContext";
import { ICharacter, requestFight } from "../../apis";
import { FaCaretDown } from "react-icons/fa";
import { RxCross2, RxDividerVertical } from "react-icons/rx";
import Button from "react-bootstrap/Button";

function SelectInput() {
  const [selectedCharacters, setSelectedCharacters] = useState<
    Array<ICharacter>
  >([]);
  const [validateSelection, setValidateSelection] = useState(false);
  const [dropdownShow, setDropdownShow] = useState(false);
  const { user, setFightResult } = useContext(GlobalContext);

  async function handleFight() {
    if (selectedCharacters.length == 0) {
      setValidateSelection(true);
    } else {
      const characterId = selectedCharacters.map((c) => c.id);
      setValidateSelection(false);
      try {
        const fightResultResponse = (await requestFight(user!.jwt, characterId))
          .data;
        setFightResult(fightResultResponse.data.log);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.log("fight request error: ", error);
        }
      }
    }
  }

  function selectToggle(character: ICharacter) {
    if (selectedCharacters.includes(character)) {
      // if selected, unselect it and update state
      setSelectedCharacters(
        selectedCharacters.filter((c) => c.id != character.id)
      );
    } else {
      // if not selected, select it and update state
      setSelectedCharacters([...selectedCharacters, character]);
    }
  }

  function dropDownElement() {
    if (user!.characters.length == 0) {
      return (
        <li className="list-group-item list-element">
          You don't have any characters... go create some
        </li>
      );
    } else if (selectedCharacters.length == user!.characters.length) {
      return (
        <li className="list-group-item list-element">
          You have selected all characters
        </li>
      );
    }
    return user!.characters.map(
      (c) =>
        !selectedCharacters.includes(c) && (
          <li
            key={c.id}
            className="list-group-item list-element"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              selectToggle(c);
              setDropdownShow(false);
            }}
          >
            {c.name}
          </li>
        )
    );
  }
  return (
    <>
      <div className="d-flex flex-column-reverse flex-lg-row gap-2">
        <div
          tabIndex={0}
          onClick={() => setDropdownShow(true)}
          onBlur={() => setDropdownShow(false)}
          className={`form-control p-2 d-flex align-items-center position-relative ${
            validateSelection ? "border-danger" : ""
          }`}
        >
          <span className="flex-grow-1">
            {selectedCharacters.length > 0
              ? selectedCharacters.map((c) => (
                  <Button
                    className="mx-1 my-1 align-items-center select-badges"
                    key={c.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectToggle(c);
                    }}
                  >
                    {c.name}
                    <RxCross2 className="ms-1" />
                  </Button>
                ))
              : "Select Characters for the fight..."}
          </span>
          <RxCross2
            className="select-bar-icons"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCharacters([]);
              setDropdownShow(false);
            }}
          />
          <div className="input-divider" />
          <FaCaretDown
            className="select-bar-icons"
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownShow((pre) => !pre)}}
          />
          <ul
            className={`list-group w-100 position-absolute top-105 start-0 ${
              dropdownShow ? "" : "d-none"
            }`}
          >
            {dropDownElement()}
          </ul>
        </div>
        <Button className="" size="lg" variant="dark" onClick={handleFight}>
          Fight!
        </Button>
      </div>
      {validateSelection && (
        <div className="text-danger">
          you need to pick at least 1 character to start a fight
        </div>
      )}
    </>
  );
}

export default SelectInput;

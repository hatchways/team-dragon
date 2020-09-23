import React, { useEffect } from "react";
import StepTwo from "./step 2/StepTwo";
import { useNewGame } from "../../contexts/DataContext"

const WaitingRoom = (props) => {
  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;


  useEffect(() => {
    setNewGame((prevState) => ({
      ...prevState,
      matchId: props.value.match.params.id,
    }));
  }, [])

  return (
    <div>
      <h2>Welcome, please wait for assignment</h2>
      <StepTwo />
    </div>
  );
};

export default WaitingRoom;

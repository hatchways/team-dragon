import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red, blue, grey } from "@material-ui/core/colors";


// import { makeStyles, createStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     color: {
//       noTeamColor: theme.grey.medium,
//       blueTeamColor: theme.blue.medium,
//       redTeamColor: theme.red.medium,
//     },
//   })
// );

const noTeamColor = grey[500];
const blueTeamColor = blue[500];
const redTeamColor = red[500];

const NoTeamRadio = withStyles({
  root: {
    color: noTeamColor,
    "&$checked": {
      color: noTeamColor,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blueTeamColor,
    "&$checked": {
      color: blueTeamColor,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: redTeamColor,
    "&$checked": {
      color: redTeamColor,
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const PlayerSelect = (props) => {

  const handleChange = (event) => {

    //Following conditional statements remove player a spymaster who is moved to no team
    if (event.target.value === "noTeam" && props.player.id === props.spyMaster.teamBlue) {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        teamBlue: "",
      }));
    }
    if (event.target.value === "noTeam" && props.player.id === props.spyMaster.teamRed) {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        teamRed: "",
      }));
    }

    const {id, name} = props.player
    let changeTeam = props.players
    changeTeam[props.ele] = {id, name, team: event.target.value}
    props.setPlayers([...changeTeam]);
  };



  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.player.name}</FormLabel>
        <RadioGroup
          aria-label="team"
          name="team1"
          value={props.player.team}
          onChange={handleChange}
        >
          <FormControlLabel
            value="noTeam"
            control={<NoTeamRadio />}
            label="No Team"
          />
          <FormControlLabel
            value="teamBlue"
            control={<BlueRadio />}
            label="Blue Team"
          />
          <FormControlLabel
            value="teamRed"
            control={<RedRadio />}
            label="Red Team"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PlayerSelect;

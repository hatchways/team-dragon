import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red, blue } from "@material-ui/core/colors";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  playerLabel: (newGame) => ({
    color: newGame === 3 ? theme.grey.dark : theme.grey.mediumDark,
    fontSize: "1.1rem",
    marginBottom: ".5rem",
  }),
}));

const blueTeamColor = blue[500];
const redTeamColor = red[500];

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
  const classes = useStyles(props.newGame);

  const handleChange = (event) => {
    const { id, name } = props.player;
    let changeTeam = props.players;
    changeTeam[props.ele] = { id, name, team: event.target.value };
    props.setPlayers([...changeTeam]);
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel className={classes.playerLabel} component="legend">
          {props.player.name}
        </FormLabel>
        <RadioGroup
          aria-label="team"
          name="team1"
          value={props.player.team || ""}
          onChange={handleChange}
        >
          <FormControlLabel
            value="blue"
            control={<BlueRadio />}
            label="Blue Team"
            disabled={props.newGame !== 3}
          />
          <FormControlLabel
            value="red"
            control={<RedRadio />}
            label="Red Team"
            disabled={props.newGame !== 3}
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default PlayerSelect;

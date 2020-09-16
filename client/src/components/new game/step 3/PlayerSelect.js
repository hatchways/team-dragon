import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

 import {red, blue, grey} from '@material-ui/core/colors';



// import { makeStyles, createStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     color: {
//       noTeam: theme.grey.medium,
//       blueTeam: theme.blue.medium,
//       redTeam: theme.medium,
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
  const [value, setValue] = React.useState("No Team");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.player}</FormLabel>
        <RadioGroup
          aria-label="team"
          name="team1"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="No Team"
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

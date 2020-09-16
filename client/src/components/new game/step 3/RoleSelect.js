import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";
import {red, blue, grey} from '@material-ui/core/colors';

const noTeamColor = grey[500];
const blueTeamColor = blue[500];
const redTeamColor = red[500];
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RoleSelect = () => {
  const classes = useStyles();
  const [role, setRole] = React.useState("");

  const handleChange = (event) => {
    setRole(event.target.value);
  };
  return (
    <>
      {" "}
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            SpyMaster
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={role}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value={10}>player 2</MenuItem>
            <MenuItem value={20}>player 3</MenuItem>
          </Select>
          <FormHelperText>Team Blue</FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            SpyMaster
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={role}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value={30}>player 4</MenuItem>
            <MenuItem value={40}>player 5</MenuItem>
          </Select>
          <FormHelperText>Team Red</FormHelperText>
        </FormControl>
      </div>
    </>
  );
};

export default RoleSelect;

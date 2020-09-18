import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  InputLabel,
  MenuItem,
  FormHelperText,
  FormControl,
  Select,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RoleSelect = (props) => {
  const classes = useStyles();
  // const playerData = localStorage.getItem("players");
  // console.log(playerData);

  const handleChange = (event) => {
    if (props.color === "red") {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        teamRed: event.target.value,
      }));
    }

    if (props.color === "blue") {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        teamBlue: event.target.value,
      }));
    }
  };

  const displayTeam = useCallback(() => {
    if (props.team.length < 1) return <MenuItem value="empty">Empty</MenuItem>;
    return props.team.map((ele, i) => {
      return (
        <MenuItem key={i} value={ele.id}>
          {ele.name}
        </MenuItem>
      );
    });
  }, [props.team]);

  return (
    <>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            SpyMaster
          </InputLabel>
          <Select
            labelId="demo-simple-select-placeholder-label-label"
            id="demo-simple-select-placeholder-label"
            value={
              props.color === "red"
                ? props.spyMaster.teamRed
                : props.spyMaster.teamBlue
            }
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {displayTeam()}
          </Select>
          {props.color === "red" ? (
            <FormHelperText>Team Red</FormHelperText>
          ) : (
            <FormHelperText>Team Blue</FormHelperText>
          )}
        </FormControl>
      </div>
    </>
  );
};

export default RoleSelect;

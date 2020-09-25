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
  selectRedEmpty: {
    backgroundColor: theme.red.light,
    marginTop: theme.spacing(2),
  },
  selectBlueEmpty: {
    backgroundColor: theme.blue.light,
    marginTop: theme.spacing(2),
  },
  redHelper: {
    color: theme.red.medium,
  },
  blueHelper: {
    color: theme.blue.medium,
  },
}));

const RoleSelect = (props) => {
  const classes = useStyles();

  const handleChange = (event) => {
    if (props.color === "red") {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        red: event.target.value,
      }));
    }

    if (props.color === "blue") {
      props.setSpyMaster((prevState) => ({
        ...prevState,
        blue: event.target.value,
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
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            SpyMaster
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={
              props.color === "red" ? props.spyMaster.red : props.spyMaster.blue
            }
            onChange={handleChange}
            displayEmpty
            className={
              props.color === "red"
                ? classes.selectRedEmpty
                : classes.selectBlueEmpty
            }
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            {displayTeam()}
          </Select>
          {props.color === "red" ? (
            <FormHelperText className={classes.redHelper}>
              Team Red
            </FormHelperText>
          ) : (
            <FormHelperText className={classes.blueHelper}>
              Team Blue
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </>
  );
};

export default RoleSelect;

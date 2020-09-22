import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import { theme } from "../../themes/theme";

const useStyles = makeStyles(() => ({
  root: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brand: {
    textTransform: "uppercase",
    letterSpacing: "0.6rem",
    "& a": {
      textDecoration: "none",
      color: "black",
    },
  },
  red: {
    color: theme.red.medium,
  },
  blue: {
    color: theme.blue.medium,
  },
  profileText: {
    padding: "0 0.5rem",
  },
  button: {
    marginRight: "1rem",
  },
}));

const MatchBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.brand} variant="h3">
        <Link to="/">Cluewords</Link>
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gridTemplateRows="auto"
        gap="1rem"
      >
        <Box
          className={classes.blue}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3">8</Typography>
          <Typography>Blue Team</Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant="h1">-</Typography>
        </Box>
        <Box
          className={classes.red}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography variant="h3">8</Typography>
          <Typography>Red Team</Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="large"
        >
          New Game
        </Button>

        <Button>
          <Avatar>U</Avatar>
          <Typography className={classes.profileText}>My Profile</Typography>
          <Icon>arrow_drop_down</Icon>
        </Button>
      </Box>
    </div>
  );
};

export default MatchBar;

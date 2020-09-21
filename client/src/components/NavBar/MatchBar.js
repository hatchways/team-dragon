import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu"
import Icon from '@material-ui/core/Icon';

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
    }
  }
}));

const MatchBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className={classes.brand}>
        <Link to="/">Cluewords</Link>
      </h1>
      <div className={classes.score}>
        <div>
          <span>6</span>
          <span>Blue Team</span>
        </div>
        <span>-</span>
        <div>
          <span>6</span>
          <span>Red Team</span>
        </div>
      </div>
      <div className={classes.profile}>
        <Button>
          New Game
        </Button>
        <Button
          aria-controls="profile-menu"
        >
          <Avatar>U</Avatar>
          My Profile
          <Icon>arrow_drop_down</Icon>
        </Button>
        <Menu
          id="profile-menu"
          open={false}
        >
        </Menu>
      </div>
    </div>
  );
};

export default MatchBar;

import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {
  Box,
  Avatar,
  Button,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useGameStatus } from "../../contexts/GameContext";
import useStyles from "./styles";
import axios from "axios";

const NavBar = (props) => {
  const classes = useStyles();
  const [gameStatus] = useGameStatus();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  // Toggle Login and Logout
  const handleAuthentication = () => {
    if (loggedIn) {
      localStorage.clear();
      setLoggedIn(false);
      props.history.push("/");
    } else {
      setLoggedIn(true);
      props.history.push("/login");
    }
  };

  const handleAvatarClick = () => {
    props.history.push("/edit-profile");
    console.log(props)
  };

  useEffect(() => {
    if (localStorage.getItem("id")) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [loggedIn]);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (userId) {
      axios
        .get(`/profile/${userId}`)
        .then((result) => {
          if (result) {
            const imageUrl = result.data.user.profileImage.imageLocation;
            setProfileImageUrl(imageUrl);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  if (gameStatus !== "running") {
    return (
      <nav className={classes.NavBar}>
        <Box className={classes.NavBarWrap}>
          <Typography className={classes.Brand} variant="h3">
            <Link to="/">Cluewords</Link>
          </Typography>
          <Box className={classes.Profile}>
            <Avatar
              src={profileImageUrl ? profileImageUrl : ""}
              onClick={handleAvatarClick}
              style={{display: loggedIn ? "block":"none"}}
            ></Avatar>
            <Button
              variant="outlined"
              color="primary"
              className={classes.ProfileItem}
              onClick={handleAuthentication}
            >
              <Typography>{loggedIn ? "Logout" : "Login"}</Typography>
            </Button>
          </Box>
        </Box>
      </nav>
    );
  } else {
    return null;
  }
};

export default withRouter(NavBar);

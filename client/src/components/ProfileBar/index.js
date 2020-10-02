import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Box, Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useUser } from "../../contexts/UserContext";
import useStyles from "./styles";
import axios from "axios";
import { useGameStatus } from "../../contexts/GameContext";

const ProfileBar = (props) => {
  const classes = useStyles();

  const [gameStatus, setGameStatus] = useGameStatus();
  const [user, setUser] = useUser();

  // Local State
  const [profileImageUrl, setProfileImageUrl] = useState("");

  // Toggle Login and Logout
  const handleAuthentication = () => {
    if (user) {
      localStorage.clear();
      axios
        .post("/users/logout")
        .then((result) => {
          setUser(null);
        })
        .catch((err) => console.log(err));
      setGameStatus("setup");
      props.history.push("/");
    } else {
      props.history.push("/login");
    }
  };

  const handleAvatarClick = () => {
    props.history.push("/edit-profile");
  };

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageLocation);
    }
  }, [user]);

  return (
    <Box className={classes.Profile}>
      {user ? (
        <>
          <Avatar
            src={profileImageUrl ? profileImageUrl : ""}
            onClick={handleAvatarClick}
          ></Avatar>
          <Typography>{user.name}</Typography>
        </>
      ) : null}
      <Button
        variant="outlined"
        color="primary"
        className={classes.ProfileItem}
        onClick={handleAuthentication}
      >
        <Typography>{user ? "Logout" : "Login"}</Typography>
      </Button>
    </Box>
  );
};

export default ProfileBar;

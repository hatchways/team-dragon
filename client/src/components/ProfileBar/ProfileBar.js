import React, { useEffect, useState } from "react";
import { Box, Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useUser } from "../../contexts/UserContext";
import { useGameStatus } from "../../contexts/GameContext";
import useStyles from "./styles";
import Cookies from "js-cookie";


const ProfileBar = (props) => {
  const classes = useStyles();

  const [, setGameStatus] = useGameStatus();
  const [user, setUser] = useUser();
  const [profileImageUrl, setProfileImageUrl] = useState("");

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageLocation);
    }
  }, [user]);

  // Toggle Login and Logout
  const handleAuthentication = () => {
    if (user) {
      Cookies.clear("token");
      setUser(null);
      setGameStatus("setup");
      props.history.push("/");
    } else {
      props.history.push("/login");
    }
  };

  const handleAvatarClick = () => {
    props.history.push("/edit-profile");
  };

  return (
    <Box className={classes.Profile}>
      {user ? (
        <>
          <Avatar
            src={profileImageUrl ? profileImageUrl : ""}
            onClick={handleAvatarClick}
            className={classes.ProfileItem}
          ></Avatar>
          <Typography color="secondary" className={classes.UserName}>
            {user.name}
          </Typography>
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

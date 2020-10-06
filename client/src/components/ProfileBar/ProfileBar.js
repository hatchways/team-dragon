import React, { useEffect, useState } from "react";
import { Box, Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useUser } from "../../contexts/UserContext";
import useStyles from "./styles";
import axios from "axios";
import { useGameStatus } from "../../contexts/GameContext";

const ProfileBar = (props) => {
  const classes = useStyles();

  const [, setGameStatus] = useGameStatus();
  const [user, setUser] = useUser();

  // Local State
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const userId = localStorage.getItem("id");

  // Toggle Login and Logout
  const handleAuthentication = () => {
    if (userId) {
      localStorage.clear();
      setUser(null);
      setGameStatus("setup");
      props.history.push("/");
    } else {
      props.history.push("/login");
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const result = await axios.get(`/profile/${userId}`);
      setUser(result.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAvatarClick = () => {
    props.history.push("/edit-profile");
  };

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageLocation);
    } else if (userId) {
      getProfile();
    }
  }, [user, userId]);

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

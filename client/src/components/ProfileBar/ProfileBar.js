import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Button,
  Snackbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useUser } from "../../contexts/UserContext";
import { useGameStatus } from "../../contexts/GameContext";
import useStyles from "./styles";
import axios from "axios";

const ProfileBar = (props) => {
  const classes = useStyles();

  const [, setGameStatus] = useGameStatus();
  const [user, setUser] = useUser();
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageLocation);
    }
  }, [user]);

  // Toggle Login and Logout
  const handleAuthentication = async () => {
    if (user) {
      setUser(null);
      setGameStatus("setup");
      const logout = await axios.post("/users/logout");
      setSnackbarMessage(logout.data.message);
      setOpenSnackbar(true);
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenSnackbar(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
};

export default ProfileBar;

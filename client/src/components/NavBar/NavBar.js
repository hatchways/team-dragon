import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { Box, Avatar, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useGameStatus } from "../../contexts/GameContext";
import { useUser } from "../../contexts/UserContext";
import useStyles from "./styles";

const NavBar = (props) => {
  const classes = useStyles();

  // Contexts
  const [gameStatus] = useGameStatus();
  const [user, setUser] = useUser();

  // Local State
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const userId = localStorage.getItem("id");

  // Toggle Login and Logout
  const handleAuthentication = () => {
    if (userId) {
      localStorage.clear();
      setUser(null);
      // axios
      //   .post("/users/logout")
      //   .then((result) => {
      //     setUser(null);
      //   })
      //   .catch((err) => console.log(err));
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

  if (gameStatus === "setup") {
    return (
      <nav className={classes.NavBar}>
        <Box className={classes.NavBarWrap}>
          <Typography className={classes.Brand} variant="h3">
            <Link to="/">Cluewords</Link>
          </Typography>
          <Box className={classes.Profile}>
            {user ? (
              <Avatar
                src={profileImageUrl ? profileImageUrl : ""}
                onClick={handleAvatarClick}
              ></Avatar>
            ) : null}
            {/* <Avatar
              src={profileImageUrl ? profileImageUrl : ""}
              onClick={handleAvatarClick}
              // style={{ display: loggedIn ? "block" : "none" }}
            ></Avatar> */}
            <Button
              variant="outlined"
              color="primary"
              className={classes.ProfileItem}
              onClick={handleAuthentication}
            >
              <Typography>{userId ? "Logout" : "Login"}</Typography>
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

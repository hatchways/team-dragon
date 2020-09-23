import React from "react";
import { Link, withRouter, matchPath } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const NavBar = (props) => {
  const classes = useStyles();
  const inMatch = matchPath(props.location.pathname, {
    path: "/match/:id",
  });

  return (
    <nav className={classes.navBar}>
      {inMatch ? (
        <Box 
          className={classes.navBarWrap}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
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
        </Box>
      ) : ( 
        <Box 
          className={classes.navBarWrap}          
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography className={classes.brand} variant="h3">
            <Link to="/">Cluewords</Link>
          </Typography>
        </Box>
      )}
    </nav>
  );
};

export default withRouter(NavBar);

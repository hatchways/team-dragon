import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const GameBar = (props) => {
  const classes = useStyles(props);

  return (
    <nav className={classes.navBar}>
      <Box className={classes.navBarWrap}>
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
    </nav>
  );
};

export default GameBar;

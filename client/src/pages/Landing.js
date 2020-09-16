import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Container, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  card: {
    padding: "2rem",
    textAlign: "center",
  },
  heading: {
    marginBottom: "2rem",
  },
  button: {
    margin: "0 1rem",
  }
})); 

function Landing() {
  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="md">
      <Card className={classes.card}>
        <Typography className={classes.heading} variant="h2">
          Welcome to Cluewords!
        </Typography>
        <Button
          className={classes.button}
          component={Link} 
          to="/register"
          variant="contained"
          color="primary"
          size="large"
        >
          Sign Up
        </Button>
        <Button
          className={classes.button}
          component={Link} 
          to="/login"
          variant="contained"
          color="primary"
          size="large"
        >
          Sign In
        </Button>
      </Card>
    </Container>
  )
}

export default Landing;

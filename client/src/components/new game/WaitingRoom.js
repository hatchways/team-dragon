import React, { useEffect } from "react";
import StepTwo from "./step 2/StepTwo";
import { useNewGame, useHostName } from "../../contexts/DataContext";
import { useParams } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      padding: "2rem",
      marginTop: "2rem",
    },
    titleDivider: {
      borderTop: `7px solid ${theme.palette.primary.main}`,
      width: "5rem",
      marginTop: "1rem",
    },
    host: {
      color: theme.palette.primary.main
    }
  }),
);

const WaitingRoom = (props) => {
  const classes = useStyles();
  const [newGame, setNewGame] = useNewGame();
  const [hostName] = useHostName();
  let { id } = useParams();


  const userName = localStorage.getItem("name");

  useEffect(() => {
    setNewGame((prevState) => ({
      ...prevState,
      matchId: id,
    }));
  }, []);

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <Typography align="center" variant="h1">
          Welcome {userName}!
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Divider className={classes.titleDivider} />
        </Grid>
        <Box my={2}>
          <Typography align="center" variant="h3">
            Your host is: <Box component="span" className={classes.host}>{hostName}</Box> <br />
            Please wait while they assign the teams.
          </Typography>
        </Box>
        <StepTwo />
      </Card>
    </Container>
  );
};

export default WaitingRoom;

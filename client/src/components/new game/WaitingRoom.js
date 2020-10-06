import React from "react";
import StepTwo from "./step 2/StepTwo";
import { useHostName } from "../../contexts/DataContext";
import { useUser } from "../../contexts/UserContext";
import {
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    color: theme.palette.primary.main,
  },
}));

const WaitingRoom = (props) => {
  const classes = useStyles();
  const [hostName] = useHostName();
  const [user] = useUser();

  return (
    <Container maxWidth="md">
      <Card className={classes.card}>
        <Typography align="center" variant="h1">
          Welcome {user.name}!
        </Typography>
        <Grid container direction="row" justify="center" alignItems="center">
          <Divider className={classes.titleDivider} />
        </Grid>
        <Box my={2}>
          <Typography align="center" variant="h3">
            Your host is:{" "}
            <Box component="span" className={classes.host}>
              {hostName}
            </Box>{" "}
            <br />
            Please wait while they assign the teams.
          </Typography>
        </Box>
        <StepTwo />
      </Card>
    </Container>
  );
};

export default WaitingRoom;

import React, { useEffect } from "react";
import EmailInvite from "./EmailInvite";
import LinkInvite from "./LinkInvite";
import { useNewGame } from "../../../DataContext";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Divider, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    inviteSection: {
      margin: "2rem",
    },
  })
);

const StepOne = () => {
  const classes = useStyles();

  const newGameContext = useNewGame();
  const [newGame, setNewGame] = newGameContext;



  return (
    <>
      <Grid container spacing={2} className={classes.inviteSection}>
        <Grid item xs={8}>
          <EmailInvite />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs>
          <LinkInvite />
        </Grid>
      </Grid>
    </>
  );
};

export default StepOne;

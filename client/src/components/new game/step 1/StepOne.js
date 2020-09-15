import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import EmailInvite from "./EmailInvite";
import LinkInvite from "./LinkInvite";

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

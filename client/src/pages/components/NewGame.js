import React from "react";
import { useState } from "react";
import { Button, Container, Divider, Grid } from "@material-ui/core";
import LinkInvite from "./LinkInvite";
import EmailInvite from "./EmailInvite";
 
const NewGame = (props) => {
  return (
    <Container maxWidth="md">
      <h1>New Game </h1>
 
      <Divider />
 
      <Grid container spacing={2}>
      <Grid item xs={8}>
        <EmailInvite />
        </Grid>
        <Divider orientation="vertical" flexItem /> {/* not working yet */}
        <Grid item xs>
        <LinkInvite />
        </Grid>
      </Grid>
 
      <Button variant="contained" color="primary">
        Create Game
      </Button>
    </Container>
  );
};
 
export default NewGame;
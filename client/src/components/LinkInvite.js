import React from "react";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    copy: {
      background: theme.white,
    },
  })
);

const LinkInvite = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h3">Or share link:</Typography>
      <Button variant="contained" className={classes.copy}>
        Copy
      </Button>
    </>
  );
};

export default LinkInvite;

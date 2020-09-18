import React, { useState } from "react";
import { useNewGame } from "../../../DataContext";
import { Button, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";

const useStyles = makeStyles((theme) =>
  createStyles({
    copy: {
      background: theme.white,
    },
  })
);

const LinkInvite = (props) => {
  const classes = useStyles();

  //Holds Match ID to be copied and shared with other players
  const newGameContext = useNewGame();
  const [newGame] = newGameContext;

  const [copy, setCopy] = useState({ value: newGame.matchId, copied: false });

  console.log(copy);

  return (
    <>

    
      <Typography variant="h3">Or share link:</Typography>
      <CopyToClipboard
        text={copy.value}
        onCopy={() =>
          setCopy({ value: newGame.matchId, copied: true })
        }
      >
        <Button variant="contained" className={classes.copy}>
          Copy
        </Button>
      </CopyToClipboard>
      {copy.copied ? <span style={{color: 'red'}}>Copied.</span> : null}

    </>
  );
};

export default LinkInvite;

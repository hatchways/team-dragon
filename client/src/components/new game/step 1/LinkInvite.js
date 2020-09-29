import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Typography, Box, Grid } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import LinkIcon from "@material-ui/icons/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Flip from "react-reveal/Flip";

const useStyles = makeStyles((theme) =>
  createStyles({
    copy: {
      background: theme.white,
    },
    copyConfirm: {
      color: theme.palette.primary.main,
    },
  }),
);

const LinkInvite = (props) => {
  const classes = useStyles();

  //Holds Game ID to be copied and shared with other players
  let { id } = useParams();

  const [copy, setCopy] = useState({
    value: "",
    copied: false,
  });

  useEffect(() => {
    setCopy({
      value: `http://localhost:3000/${id}`,
      copied: false,
    });
  }, []);

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h3">Or share link:</Typography>
        <Box my={".8rem"}>
          <CopyToClipboard
            text={copy.value}
            onCopy={() =>
              setCopy({
                value: `http://localhost:3000/${id}`,
                copied: true,
              })
            }
          >
            <Button
              startIcon={<LinkIcon />}
              variant="contained"
              className={classes.copy}
            >
              Copy
            </Button>
          </CopyToClipboard>
        </Box>
        {copy.copied ? (
          <Flip left>
            <span className={classes.copyConfirm}>Copied.</span>
          </Flip>
        ) : null}
      </Grid>
    </>
  );
};

export default LinkInvite;

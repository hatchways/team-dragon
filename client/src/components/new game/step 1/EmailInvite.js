import React from "react";
import { useEmails } from "../../../contexts/DataContext";
import { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  InputAdornment,
  Grid,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import isEmail from "validator/lib/isEmail";
import Flip from "react-reveal/Flip";

const useStyles = makeStyles((theme) =>
  createStyles({
    invite: {
      background: theme.grey.dark,
      color: theme.white,
    },
    item: {
      padding: 0,
    },
  }),
);

const EmailInvite = () => {
  const emailsContext = useEmails();
  const [emails, setEmails] = emailsContext;

  const [emailForm, setEmailForm] = useState("");
  const [validate, setValidate] = useState({ error: false, message: "" });

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevents empty tag submission
    if (emailForm === "") {
      setValidate({ error: false, message: "" });
      return; //needs additional logic to verify if valid email address
    }

    if (emails.includes(emailForm)) {
      setValidate({ error: true, message: "User already invited" });
      setEmailForm("");
      return;
    }

    if (!isEmail(emailForm)) {
      setValidate({ error: true, message: "Not a valid email address" });
      return;
    }
    setValidate({ error: false, message: "" });
    setEmails([...emails, emailForm]);
    setEmailForm("");
  };

  const displayEmails = emails.map((email, i) => {
    return (
      <ListItem className={classes.item} key={i}>
        <Flip left>
          <ListItemIcon>
            <CheckIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={email} />
        </Flip>
      </ListItem>
    );
  });

  return (
    <>
      <Typography variant="h3">Invite friends via email:</Typography>
      <Box mt={".8rem"}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            label="Email Address"
            variant="outlined"
            value={emailForm}
            error={validate.error === true}
            helperText={validate.message}
            onChange={(e) => setEmailForm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    className={classes.invite}
                    type="submit"
                  >
                    Send invite
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </form>
        {emails.length > 0 && (
          <div>
            <List>{displayEmails}</List>
          </div>
        )}
      </Box>
    </>
  );
};

export default EmailInvite;

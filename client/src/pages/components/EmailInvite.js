import React from "react";
import { useEmails } from "../../DataContext";
import { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    invite: {
      background: theme.grey.dark,
      color: theme.white,
    },
  })
);

const EmailInvite = () => {
  const emailsContext = useEmails();
  const [emails, setEmails] = emailsContext;

  const [emailForm, setEmailForm] = useState("");

  const classes = useStyles();

  const handleSubmit = () => {
    // Prevents empty tag submission
    if (emailForm === "") return; //needs additional logic to verify if valid email address

    setEmails([...emails, emailForm]);
    setEmailForm("");
  };

  const displayEmails = emails.map((email, i) => {
    return <li key={i}>{email}</li>;
  });

  return (
    <>
      <Typography variant="h3">Invite friends via email</Typography>
      <TextField
        label="Email Address"
        variant="outlined"
        value={emailForm}
        onChange={(e) => setEmailForm(e.target.value)}
      />

      <Button
        variant="contained"
        className={classes.invite}
        onClick={handleSubmit}
      >
        Send invite
      </Button>
      {emails.length > 0 && (
        <div>
          <ul>{displayEmails}</ul>
        </div>
      )}
    </>
  );
};

export default EmailInvite;

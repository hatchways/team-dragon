import React from "react";
import { useEmails } from "../../../DataContext";
import { useState } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import isEmail from "validator/lib/isEmail";

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
    return <li key={i}>{email}</li>;
  });

  return (
    <>
      <Typography variant="h3">Invite friends via email</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          variant="outlined"
          value={emailForm}
          error={validate.error === true}
          helperText={validate.message}
          onChange={(e) => setEmailForm(e.target.value)}
        />

        <Button
          variant="contained"
          className={classes.invite}
          // onClick={handleSubmit}
          type="submit"
        >
          Send invite
        </Button>
      </form>
      {emails.length > 0 && (
        <div>
          <ul>{displayEmails}</ul>
        </div>
      )}
    </>
  );
};

export default EmailInvite;

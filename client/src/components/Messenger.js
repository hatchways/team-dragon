import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles( theme => ({
  root: {
    width: "100%",
    height: "100%",
    background: theme.grey.superLight,
    overflow: "hidden",
  },
  messageContainer: {
    padding: "2rem",
    minHeight: "80%",
    maxHeight: "80%",
    overflow: "auto",
  },
  message: {
    margin: "0.7rem 0",
    padding: "0.8rem",
    width: "auto",
  },
  messageSender: {
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
  messageMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.grey.medium,
    borderRadius: "0px 15px 15px 15px",
    display: "inline-block",
  },
  messageMe: {
    margin: "0.7rem 0",
    padding: "0.8rem",
    width: "auto",
    display: "flex",
    justifyContent: "flex-end",
  },
  messageMeMsg: {
    margin: 0,
    padding: "1rem",
    background: theme.red.medium,
    borderRadius: "15px 15px 0px 15px",
    color: theme.white,
    display: "inline-block",
  },
  messageInput: {
    height: "20%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Messenger = (props) => {
  const classes = useStyles();

  const [messageInput, setMessageInput] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.sendMessage(messageInput);
    setMessageInput('');
  }

  return (
    <div className={classes.root}>
      <div className={classes.messageContainer}>
        {props.messages.map(m => (
          m.sender === props.currentUser
            ? (
              <div key={m.id} className={classes.messageMe}>
                <div className={classes.messageMeMsg}>{m.message}</div>
              </div>
            )
            : (
              <div key={m.id} className={classes.message}>
                <div className={classes.messageSender}>{m.sender}:</div>
                <div className={classes.messageMsg}>{m.message}</div>
              </div>
            )
        ))}
      </div>
      <Divider /> 
      <form 
        className={classes.messageInput}
        onSubmit={handleSubmit}
      >
        <TextField
          type="text"
          placeholder="Type here..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
        >
          Done
        </Button>
      </form>
    </div>
  )
}

Messenger.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
}

export default Messenger;

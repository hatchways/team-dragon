import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

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
  const elRef = React.useRef(null);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    elRef.current.scrollTop = elRef.current.scrollHeight;
  }, [props.messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.sendMessage(messageInput);
    setMessageInput('');
  }

  return (
    <div className={classes.root}>
      <List className={classes.messageContainer} ref={elRef}>
        {props.messages.map(m => (
          m.sender === props.currentUser
            ? (
              <div key={m.id} className={classes.messageMe}>
                <Typography className={classes.messageMeMsg}>
                  {m.message}
                </Typography>
              </div>
            )
            : (
              <div key={m.id} className={classes.message}>
                <Typography className={classes.messageSender}>
                  {m.sender}:
                </Typography>
                <Typography className={classes.messageMsg}>
                  {m.message}
                </Typography>
              </div>
            )
        ))}
      </List>
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

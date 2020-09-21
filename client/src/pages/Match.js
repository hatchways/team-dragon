import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from 'uuid';
import socket from "../socket";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateAreas: `"messenger board"`,
    gridTemplateColumns: "450px 1fr",
    gridTemplateRows: "auto",
  },
  boardGame: {
    gridArea: "board",
    background: theme.grey.medium,
  },
  sideMessenger: {
    gridArea: "messenger",
    background: theme.grey.superLight,
    maxHeight: "100%",
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
    background: theme.grey.light,
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

const Match = (props) => {
  const classes = useStyles();

  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.emit("join", props.match.params.id, ({ name, history }) => {
      setName(name);
      setMessages(history); 
    });

    socket.on("message", msgData => {
      // update message list
      setMessages(prevMessages => [...prevMessages, msgData]);
    });
  }, [props.match.params.id]);

  const sendMessage = (event) => {
    event.preventDefault();

    const msgData = {
      id: uuid(),
      sender: name,
      message: messageInput,
    }

    // send message to the server
    socket.emit("message", msgData);

    // clear input field
    setMessageInput('');
  }

  return (
    <div className={classes.root}>
      <div className={classes.sideMessenger}>
        <div className={classes.messageContainer}>
          {messages.map(m => (
            m.sender === name 
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
          onSubmit={sendMessage}
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
      <div className={classes.boardGame}>
        Board
      </div>
    </div>
  );
}

export default Match;

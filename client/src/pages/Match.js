import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";
import { v4 as uuid } from 'uuid';
import socket from "../socket";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateAreas: `"messenger board"`,
    gridTemplateColumns: "420px 1fr",
    gridTemplateRows: "auto",
  },
  messenger: {
    gridArea: "messenger",
    background: theme.grey.superLight,
    maxHeight: "100%",
    overflow: "hidden",
  },
  messengerList: {
    padding: "1rem",
    minHeight: "80%",
    maxHeight: "80%",
    overflow: "auto",
  },
  messengerForm: {
    height: "20%",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  board: {
    gridArea: "board",
    background: theme.grey.medium,
  }
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
      <div className={classes.messenger}>
        <List className={classes.messengerList}>
          {messages.map( m => (
            <ListItem key={m.id}>
              <ListItemText
                primary={m.sender}
                secondary={m.message}
              />
            </ListItem>
          ))}
        </List>
        <Divider /> 
        <form 
          className={classes.messengerForm}
          onSubmit={sendMessage}
        >
          <TextField
            type="text"
            placeholder="Type here..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Button
            className={classes.messengerFormButton}
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Done
          </Button>
        </form>
      </div>
      <div className={classes.board}>
        Board
      </div>
    </div>
  );
}

export default Match;

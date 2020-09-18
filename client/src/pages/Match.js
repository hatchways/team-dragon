import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";
import socket from "../socket";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "88vh",
    display: "grid",
    gridTemplateAreas: `"messenger board"`,
    gridTemplateColumns: "400px 1fr",
    gridTemplateRows: "auto",
  },
  messenger: {
    gridArea: "messenger",
    background: theme.grey.superLight,
    display: "flex",
    flexDirection: "column",
  },
  messengerList: {
    flexGrow: 1
  },
  messengerInput: {

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

  const room = "room-" + props.match.params.id;

  useEffect(() => {
    socket.emit("join", room, ({ name, history }) => {
      console.log('connected to', room, 'as', name);
      setName(name);
      setMessages(history); 
    });

    socket.on("message", history => {
      setMessages(history);
    });

    socket.on("disconnect", () => {
      socket.emit("leave", room);
    });
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    socket.emit("message", room, {
      sender: name,
      message: messageInput,
    });

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
        <div className={classes.messengerInput}>
          <form onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              type="text"
              placeholder="Write a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Done
            </Button>
          </form>
        </div>
      </div>
      <div className={classes.board}>
        Board
      </div>
    </div>
  );
}

export default Match;

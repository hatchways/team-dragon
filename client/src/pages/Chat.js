import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import io from 'socket.io-client';
const socket = io();

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  card: {
    padding: "2rem",
  },
  messageForm: {
    margin: "1rem 0",
    display: "flex",
  },
  textField: {
    flexGrow: 1,
  },
}));

function Chat(props) {
  const classes = useStyles();

  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const room = "room-" + props.match.params.room_id;

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", room, ({ name, history }) => {
        setName(name);
        setMessages(history); 
      });
    });

    socket.on("message", history => {
      setMessages(history);
    });

    socket.on("disconnect", () => {
      socket.emit("leave", room);
    });

    // close the socket when page is left
    return () => socket.disconnect();
  }, [room]);

  const onSubmit = (event) => {
    event.preventDefault();

    socket.emit("message", room, {
      sender: name,
      message: messageInput,
    });

    setMessageInput('');
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <Card className={classes.card}>
        <Typography>
          Your name: {name}
        </Typography>
        <form className={classes.messageForm} onSubmit={onSubmit}>
          <TextField
            className={classes.textField}
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
            Send
          </Button>
        </form>
        <Divider />
        <List>
          {messages.map( m => (
            <ListItem key={m.id}>
              <ListItemText
                primary={m.sender}
                secondary={m.message}
              />
            </ListItem>
          ))}
        </List>
      </Card>
    </Container>
  )
}

export default Chat;

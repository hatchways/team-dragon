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

const io = require('socket.io-client');
const socket = io("http://localhost:3001"); // connects to socket setup on proxy

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  
  card: {
    padding: "2rem",
  },

  messageForm: {
    marginBottom: "1rem",
  },

  messageList: {

  },

  me: {
    border: "1px solid red",
  }

}));

function Chat() {
  const classes = useStyles();

  const [name, setName] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join", res => {
        const { name, history } = res;
        setName(name);
        setMessages(history); 
      });
    });

    socket.on("message", data => {
      setMessages(data);
    });

    // close the socket when page is left
    return () => socket.disconnect();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();

    socket.emit("message", {
      sender: name,
      message: messageInput,
    });
    setMessageInput('');
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <Card className={classes.card}>
        <form className={classes.messageForm} onSubmit={onSubmit}>
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
            Send
          </Button>
        </form>
        <Divider />
        <List className={classes.messageList}>
          {messages.map( m => (
            <ListItem 
              className={m.sender == name ? classes.me : ""} 
              key={m.sender}
            >
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

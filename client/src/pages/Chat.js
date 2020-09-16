import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, Container, TextField } from '@material-ui/core';

const io = require('socket.io-client');
const socket = io('http://localhost:3001');

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  form: {
    display: "flex",
  }
}));

function Chat() {
  const classes = useStyles();

  const [input, setInput] = useState('');
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });

    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    socket.on("message", msg => {
      setMessage([...messages, msg]);
    });
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("message", input);
    setInput("");
  }

  return (
    <Container className={classes.root} maxWidth="md">
      <Card>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField 
            required
            fullWidth
            variant="outlined"
            type="text"
            id="input"
            name="input"
            placeholder="Enter a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Submit
          </Button>
        </form>
        <ul>
          {messages.map( (msg, idx) => (
            <li key={idx}>
              {msg}
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  )
}

export default Chat;

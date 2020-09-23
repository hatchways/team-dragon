import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";

const Messenger = (props) => {
  const classes = useStyles();
  const elRef = React.useRef(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    elRef.current.scrollTop = elRef.current.scrollHeight;
  }, [props.messages]);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.sendMessage(messageInput);
    setMessageInput("");
  };

  return (
    <div className={classes.root}>
      <List className={classes.messageContainer} ref={elRef}>
        {props.messages.map((m) =>
          m.sender === props.currentUser ? (
            <div key={m.id} className={classes.messageMe}>
              <Typography className={classes.messageMeMsg}>
                {m.message}
              </Typography>
            </div>
          ) : (
            <div key={m.id} className={classes.message}>
              <Typography className={classes.messageSender}>
                {m.sender}:
              </Typography>
              <Typography className={classes.messageMsg}>
                {m.message}
              </Typography>
            </div>
          ),
        )}
      </List>
      <Divider />
      <form className={classes.messageInput} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
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
  );
};

Messenger.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
};

export default Messenger;

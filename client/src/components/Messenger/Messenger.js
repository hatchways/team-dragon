import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
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

  const messageList = props.messages.map((m) => {
    if (m.sender === "alert") {
      return (
        <div key={uuid()} className={classes.Message}>
          <Typography className={classes.Alert}>{m.message}</Typography>
        </div>
      );
    } else if (m.sender === props.currentUser) {
      return (
        <div key={uuid()} className={classes.MessageMe}>
          <Typography className={classes.MessageMeMsg}>{m.message}</Typography>
        </div>
      );
    } else {
      return (
        <div key={uuid()} className={classes.Message}>
          <Typography className={classes.MessageSender}>{m.sender}:</Typography>
          <Typography className={classes.MessageMsg}>{m.message}</Typography>
        </div>
      );
    }
  });

  return (
    <div className={classes.Messenger}>
      <List className={classes.MessageContainer} ref={elRef}>
        {messageList}
      </List>
      <Divider />
      <form className={classes.MessageInput} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          type="text"
          placeholder="Type here..."
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        {props.spyMaster && (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Done
          </Button>
        )}
      </form>
    </div>
  );
};

Messenger.defaultProps = {
  spyMaster: false,
};

Messenger.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  spyMaster: PropTypes.bool,
};

export default Messenger;

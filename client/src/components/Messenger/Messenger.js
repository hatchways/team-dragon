import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import { Box } from "@material-ui/core";

const Messenger = (props) => {
  const classes = useStyles(props);
  const elRef = React.useRef(null);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    elRef.current.scrollTop = elRef.current.scrollHeight;
  }, [props.messages]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // if no input, do not send
    if (!messageInput || !messageInput.trim()) {
      return;
    }

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
    } else if (m.sender === props.name) {
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
      <Box className={classes.ChatBar}>
        <Typography variant="h5">Chat</Typography>
      </Box>
      <List className={classes.MessageContainer} ref={elRef}>
        {messageList}
      </List>
      {props.isTurn && (
        <Typography className={classes.YourTurn}>Make Your Move!</Typography>
      )}
      <Divider />
      <form className={classes.MessageInput} onSubmit={handleSubmit}>
        <Box
          width="100%"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <TextField
            fullWidth
            variant="outlined"
            type="text"
            placeholder="Type here..."
            InputProps={{ className: classes.messageInputColor }}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className={classes.SendButton}
          >
            Send
          </Button>
        </Box>

        {props.isSpyMaster && (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={props.changeTurn}
            disabled={!props.isTurn || props.timeOut}
            className={classes.DoneButton}
          >
            Done
          </Button>
        )}
      </form>
    </div>
  );
};

Messenger.defaultProps = {
  name: "",
  isSpyMaster: false,
  isTurn: false,
  timeOut: false,
};

Messenger.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  name: PropTypes.string,
  isSpyMaster: PropTypes.bool,
  isTurn: PropTypes.bool,
  changeTurn: PropTypes.func,
  timeOut: PropTypes.bool,
};

export default Messenger;

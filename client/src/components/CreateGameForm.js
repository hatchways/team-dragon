import React, { useEffect } from "react";
import axios from "axios";
import { Container, Card, Typography, Button } from "@material-ui/core";
import openSocket from "socket.io-client";

// Testing post request to -> /create-match
const CreateGameForm = (props) => {
  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Post request to create match
    try {
      const { data } = await axios.post("/create-match");
      console.log(data);
      props.history.push("/new");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Card>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3">Create Game</Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Create Game
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default CreateGameForm;

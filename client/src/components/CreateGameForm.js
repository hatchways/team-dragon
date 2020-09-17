import React from 'react';
import axios from 'axios';
import {Container, Card, Typography, Button} from '@material-ui/core';

// Testing post request to -> /create-match
const CreateGameForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/create-match', {
          userName: "jorawar"
      });
      console.log(data)
    } catch(err) {
        console.log(err);
    }
  }

  return (
    <Container maxWidth="sm">
      <Card>
        <form onSubmit={handleSubmit}>
          <Typography variant="h3">
            Create Game
          </Typography>

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
  )
}

export default CreateGameForm;

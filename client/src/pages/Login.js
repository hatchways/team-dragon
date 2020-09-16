import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Container, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(4),
  },
  card: {
    padding: "2rem 4rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    fontFamily: theme.fontFamily,
    margin: "1rem 0",
  },
  button: {
    margin: "1rem 0",
  }
}));

function Login(props) {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    return (
      email.length > 0 &&
      password.length > 0
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data }  = await axios.post('/users/login', {
        email,
        password,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      window.localStorage.setItem('id', data.user.id);
      window.localStorage.setItem('email', data.user.email);
      window.localStorage.setItem('name', data.user.name);
      window.localStorage.setItem('token', data.token);

      props.history.push('/new');
    } catch(err) {
      if(err.response) {
        const errObj = err.response.data;
        setErrors(errObj.errors);
      } else {
        // TODO: handle generic errors
        console.log(err.message);
      }

      setLoading(false);
    }
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h3">
            Sign In
          </Typography>

          <TextField 
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Email:"
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email !== undefined}
            helperText={errors.email}
          />

          <TextField 
            className={classes.textField}
            required
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Password:"
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password !== undefined}
            helperText={errors.password}
          />

          <Button 
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || !validateForm()}
          >
            Sign In
          </Button>

          <Typography variant="body1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </Typography>
        </form>
      </Card>

    </Container>
  )
}

export default Login;

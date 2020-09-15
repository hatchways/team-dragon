import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import { Button, Card, Container, CssBaseline, TextField, Typography } from '@material-ui/core';

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

function Register(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  const validateForm = () => {
    return (
      name.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      password === password2
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post('/users/register', {
        name,
        email,
        password,
        password2,
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      window.localStorage.setItem('id', data.user._id);
      window.localStorage.setItem('name', data.user.name);
      window.localStorage.setItem('token', data.token);

      props.history.push('/new');
    } catch(err) {
      // TODO: manage error messages
      const data = err.response.data;
      if(data.errors) {
        setErrors(data.errors);
      } else {
        setErrors({ misc: err.message })
      }

      setLoading(false);
    }
  }

  return (
    <Container className={classes.root} maxWidth="sm">
      <CssBaseline />
      <Card className={classes.card}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="h3">
            Sign Up
          </Typography>

          <TextField 
            className={classes.textField}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Name:"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name !== undefined}
            helperText={errors.name}
          />

          <TextField 
            className={classes.textField}
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

        <TextField 
            className={classes.textField}
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Confirm password:"
            type="password"
            id="password2"
            name="password2"
            placeholder="Confirm your password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            error={errors.password2 !== undefined}
            helperText={errors.password2}
          />

          <Button 
            className={classes.button}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isLoading || !validateForm()}
          >
            Sign Up
          </Button>

          <Typography variant="body1">
            Already have an account? <Link to="/login">Sign In</Link>
          </Typography>
        </form>
      </Card>

    </Container>
  )
}

export default Register;

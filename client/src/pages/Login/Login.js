import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import { useUser } from "../../contexts/UserContext";

const Login = (props) => {
  const classes = useStyles();

  const [user, setUser] = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/users/login", {
        email,
        password,
      });

      setUser(data.user);

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      window.localStorage.setItem("id", data.user.id);
      window.localStorage.setItem("email", data.user.email);
      window.localStorage.setItem("name", data.user.name);
      window.localStorage.setItem("token", data.token);

      props.history.push("/");
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        const errObj = err.response.data;
        setErrors(errObj.errors);
      } else {
        // TODO: handle generic errors
        console.log(err.message);
      }

      setLoading(false);
    }
  };
  return (
    <Container className={classes.Login} maxWidth="sm">
      <Card className={classes.FormContainer}>
        <form className={classes.Form} onSubmit={handleSubmit}>
          <Typography variant="h3">Sign In</Typography>

          <TextField
            className={classes.TextField}
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
            className={classes.TextField}
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
            className={classes.Button}
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
  );
};

export default Login;

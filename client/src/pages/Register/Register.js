import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "query-string";
import decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useUser } from "../../contexts/UserContext";
import useStyles from "./styles";

const Register = (props) => {
  const classes = useStyles();

  const [, setUser] = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const toPath = qs.parse(props.location.search).redirect || "/";

  const validateForm = () => {
    return name.length > 0 && email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/users/register", {
        name,
        email,
        password,
        password2: password,
      });

      // save user data
      const decoded = decode(data.token);
      setUser({ id: decoded.id, email: decoded.email, name: decoded.name });
      window.localStorage.setItem("token", data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      // redirect back to either game or landing page
      props.history.push(toPath);
    } catch (err) {
      if (err.response) {
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
    <Container className={classes.Register} maxWidth="sm">
      <Card className={classes.FormContainer}>
        <form className={classes.Form} onSubmit={handleSubmit}>
          <Typography variant="h3">Sign Up</Typography>

          <TextField
            className={classes.TextField}
            required
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
            Sign Up
          </Button>

          <Typography variant="body1">
            Already have an account?{" "}
            <Link to={`/login?redirect=${toPath}`}>Sign In</Link>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@material-ui/core";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";

const EditNameDialog = (props) => {
  const [user, setUser] = useUser();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`/edit-profile/${user.id}`, {
        name,
      });
      if (result) {
        setName(result.data.name);
        setUser((prevState) => ({
          ...prevState,
          name: result.data.name,
        }));
      }
    } catch (err) {
      console.log(err);
    }
    props.closeDialog();
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <Dialog open={props.open}>
      <DialogTitle>{props.title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            label="Name:"
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // error={errors.name !== undefined}
            // helperText={errors.name}
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditNameDialog;

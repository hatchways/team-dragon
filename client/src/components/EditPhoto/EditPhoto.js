import React,{useState} from "react";
import { TextField } from "@material-ui/core";

const EditPhoto = () => {

  return (
    <form>
      <TextField
        variant="standard"
        label="Name"
        type="text"
        id="name"
        name="name"
      ></TextField>
    </form>
  );
};

export default EditPhoto;

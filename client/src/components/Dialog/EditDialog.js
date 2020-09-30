import React, {useState} from "react";

const EditDialog = (props) => {
    const [title,setTitle] = useState("");
    const [open,setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleClose = () => {
        setOpenDialog(false);
      };
    
    const handleFileInput = () => {
        setFileInput(e.target)
    }
    
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
       
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditDialog;

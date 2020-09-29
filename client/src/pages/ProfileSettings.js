import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Avatar,
  makeStyles,
  Typography,
  Divider,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  DialogContentText,
  Input,
  FormControlLabel,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";

import EditPhoto from "../components/EditPhoto";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(5),
  },
  card: {
    width: "70%",
    height: "70vh",
    margin: "0 auto",
    padding: theme.spacing(4),
  },
  heading: {
    textAlign: "center",
    fontSize: "2rem",
  },
  divider: {
    border: `5px solid ${theme.palette.primary.main}`,
    marginTop: theme.spacing(1),
    width: "30%",
    margin: "0 auto",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  editIcon: {
    // margin: "0 .5rem",
  },
  fileInput: {
    display: "none",
  },
  userDetails: {
    paddingLeft: theme.spacing(2),
  },
}));

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleFileInput = (e) => {
    console.log(e.target.files[0]);
  };

  const handleImageUrl = (e) => {
    setProfileImageUrl(e.target.value);
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Card className={classes.card}>
        <Box width="50%" mx="auto">
          <Typography component="h3" className={classes.heading}>
            Profile Settings
          </Typography>
          <Divider className={classes.divider}></Divider>
        </Box>
        <Box mx="auto" mt="2rem">
          <Grid container direction="row" justify="center">
            <Grid item xs={6}>
              <Box width={200} height={200} mx="auto">
                <Avatar
                  alt="abc"
                  src={profileImageUrl ? profileImageUrl : ""}
                  className={classes.avatar}
                />
                <Box
                  onClick={() => setOpenDialog(true)}
                  textAlign="center"
                  mt={2}
                >
                  <Button variant="outlined" color="primary">
                    <EditOutlinedIcon
                      color="primary"
                      className={classes.editIcon}
                    />
                    Profile Photo
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box className={classes.userDetails}>
                <List>
                  <ListItem>
                    <Typography>
                      <strong>Name:</strong> {name ? name : "Not available"}
                    </Typography>
                    <Button color="primary">
                      <EditOutlinedIcon
                        className={classes.editIcon}
                      />
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Email:</strong> {email ? email : "Not available"}
                    </Typography>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Change Photo</DialogTitle>
        <DialogContent>
          <form>
            <Input
              type="file"
              name="file"
              id="input-file"
              onChange={handleFileInput}
              className={classes.fileInput}
            />
            <Button htmlFor="input-file" component="label" color="primary">
              Upload from computer
            </Button>
          </form>
          <Typography>OR</Typography>
          <form>
            <Input
              type="text"
              name="file"
              id="image-url"
              value={profileImageUrl}
              placeholder="Enter url of image"
              onChange={handleImageUrl}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      {/* <EditPhoto/> */}
    </Container>
  );
};

export default ProfileSettings;

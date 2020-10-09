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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Input,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import EditNameDialog from "../components/EditNameDialog";

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
  imageDialog:{
    minWidth: "30vw",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"space-between"
  },
  updateUrlBtn:{
    margin: "0 1rem"
  }
}));

const ProfileSettings = () => {
  const [user, setUser] = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditNameDialog, setOpenEditNameDialog] = useState(false);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImageUrlInput, setProfileImageUrlInput] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");

  const handleClose = async () => {
    setOpenDialog(false);
  };

  const closeEditNameDialog = () => {
    setOpenEditNameDialog(false);
  };

  const handleFileInput = async (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  // Image is uploaded to AWS S3 using form Data
  const handleFileUpload = async () => {
    if (profileImageFile) {
      const data = new FormData();
      data.append("profileImage", profileImageFile, profileImageFile.name);

      try {
        const result = await axios.post(`/edit-profile/${user.id}`, data);
        if (result) {
          const { location, token } = result.data;

          localStorage.setItem("token", token);
          setProfileImageUrl(location);

          // Updates the UserContext
          setUser((prevState) => ({
            ...prevState,
            profileImageLocation: location,
          }));
          setOpenDialog(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // // Input handler using image Url
  // const handleImageUrlInput = (e) => {
  //   setProfileImageUrlInput(e.target.value);
  // };

  // Sets the Image location for profile on the page
  useEffect(() => {
    if (user) {
      setProfileImageUrl(user.profileImageLocation);
    }
  }, [user]);

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
                      <strong>Name:</strong>{" "}
                      {user ? user.name : "Not available"}
                    </Typography>
                    <Button
                      color="primary"
                      onClick={() => setOpenEditNameDialog(true)}
                    >
                      <EditOutlinedIcon className={classes.editIcon} />
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Typography>
                      <strong>Email:</strong>{" "}
                      {user ? user.email : "Not available"}
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
          <DialogContent  className={classes.imageDialog}>
            <form>
              <Input
                type="file"
                name="profileImage"
                id="input-file"
                onChange={handleFileInput}
                className={classes.fileInput}
              />
              <Button htmlFor="input-file" component="label" color="secondary">
                {profileImageFile ? profileImageFile.name : "Select File"}
              </Button>
              <Button
                variant="contained"
                component="button"
                color="primary"
                onClick={handleFileUpload}
                className={classes.uploadImage}
              >
                Upload
              </Button>
            </form>
            {/* <Typography>OR</Typography> */}
            {/* <form>
              <Input
                className={classes.urlInput}
                type="text"
                name="file"
                id="image-url"
                value={profileImageUrlInput}
                placeholder="Enter url of image"
                onChange={handleImageUrlInput}
              />
              
                <Button
                  type="submit"
                  variant="contained"
                  component="button"
                  color="primary"
                  className={classes.updateUrlBtn}
                >
                  Update URL
                </Button>
              
            </form> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
      <EditNameDialog
        open={openEditNameDialog}
        closeDialog={closeEditNameDialog}
        title="Edit Name"
      ></EditNameDialog>
    </Container>
  );
};

export default ProfileSettings;

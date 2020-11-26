import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import dayjs from "dayjs";
import {
  Button,
  Typography,
  Paper,
  Link as MuiLink,
  Box,
} from "@material-ui/core";
import {
  LocationOn,
  CalendarToday,
  LinkedIn,
  Edit,
  KeyboardReturn,
} from "@material-ui/icons";

import { logoutUser, uploadImage } from "../../redux/actions/userActions";

import MyButton from "../../util/MyButton";
import EditDetails from "./EditDetails";

const styles = ({ theme }) => ({
  ...theme,
  logutEditButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "10px",
    padding: "10px",
  },
});

const Profile = (props) => {
  if (!props.user?.credentials) return null;
  const {
    classes,
    user: {
      credentials: {
        username,
        createdAt,
        imageUrl,
        bio,
        website,
        location,
        loading,
      },
      authenticated,
    },
    logoutUser,
    uploadImage,
  } = props;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImage(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      {!loading ? (
        authenticated ? (
          <Paper className={classes.profile}>
            <Box className={classes.profileImgWrapper}>
              <img
                src={imageUrl}
                alt="profile"
                className={classes.profileImg}
              />
            </Box>

            <Box className={classes.profileImgButtons}>
              <input
                type="file"
                id="imageInput"
                onChange={handleImageChange}
                hidden="hidden"
              />
              <MyButton
                tip="Edit profile picture"
                onClick={handleEditPicture}
                btnClassName="button"
              >
                <Edit color="primary" />
              </MyButton>
            </Box>
            <hr />
            <Box className={classes.profileDetails}>
              <MuiLink
                component={Link}
                to={`/users/${username}`}
                color="primary"
                variant="h5"
                className={classes.profileCentered}
              >
                @{username}
              </MuiLink>
              {bio && (
                <Typography variant="body2" className={classes.profileCentered}>
                  {bio}
                </Typography>
              )}
              {location && (
                <Box className={classes.iconTextCombo}>
                  <LocationOn color="primary" />
                  <span>{location}</span>
                </Box>
              )}
              {website && (
                <Box className={classes.iconTextCombo}>
                  <LinkedIn color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {website}
                  </a>
                </Box>
              )}
              <Box className={classes.iconTextCombo}>
                <CalendarToday color="primary" />
                <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              </Box>
            </Box>
            <Box className={classes.logutEditButtons}>
              <MyButton tip="Logout" onClick={handleLogout}>
                <KeyboardReturn color="primary" />
              </MyButton>
              <EditDetails />
            </Box>
          </Paper>
        ) : (
          <Paper className={classes.loginSignup}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
            >
              Sign Up
            </Button>
          </Paper>
        )
      ) : (
        <Typography>Loading...</Typography>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state?.user,
});

const mapActionToProps = { logoutUser, uploadImage };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Profile));

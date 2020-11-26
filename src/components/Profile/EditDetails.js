import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { editUserDetails } from "../../redux/actions/userActions";
import MyButton from "../../util/MyButton";

const styles = ({ theme }) => ({
  ...theme,
});

const EditDetails = (props) => {
  const { classes, credentials, editUserDetails } = props;
  const [state, setState] = useState({
    bio: "",
    website: "",
    location: "",
    open: false,
  });

  useEffect(() => {
    credentials &&
      setState({
        bio: credentials.bio,
        website: credentials.website,
        location: credentials.location,
      });
  }, [credentials]);

  const handleOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: state.bio,
      website: state.website,
      location: state.location,
    };
    editUserDetails(userDetails);
    handleClose();
  };

  if (!props.credentials) return null;

  return (
    <>
      <MyButton tip="Edit details" onClick={handleOpen}>
        <Edit color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="Short bio about yourself"
              className={classes.textField}
              value={state.bio}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              name="website"
              type="text"
              label="Website"
              placeholder="Your website"
              className={classes.textField}
              value={state.website}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={state.location}
              onChange={handleChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  credentials: state?.user?.credentials,
});

const mapActionToProps = { editUserDetails };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(EditDetails));

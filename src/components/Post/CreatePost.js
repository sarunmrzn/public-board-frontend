import React, { useEffect, useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Add, Close } from "@material-ui/icons";
import { connect } from "react-redux";
import {
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Box,
} from "@material-ui/core";
import { createPost } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";

const styles = ({ theme }) => ({
  ...theme,
  createPost: {
    marginRight: "20px",
  },
});

const CreatePost = (props) => {
  const {
    classes,
    UI: { loading, errors },
    createPost,
  } = props;
  const [state, setState] = useState({
    open: false,
    body: "",
    errors: {},
  });

  useEffect(() => {
    errors && setState({ ...state, errors });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleOpen = () => {
    setState({ ...state, open: true });
  };
  const handleClose = () => {
    setState({ ...state, open: false, body: "", errors: {} });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost({ body: state.body });
    handleClose();
  };

  return (
    <>
      <MyButton tip="Create a post" onClick={handleOpen}>
        <Add />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box className={classes.diaglogTitle}>
            <Box>Create a new Post </Box>
            <MyButton
              tip="Close"
              onClick={handleClose}
              tipClassName={classes.closeButton}
            >
              <Close />
            </MyButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            variant="outlined"
            name="body"
            type="text"
            label="Post"
            multiline
            rows="3"
            placeholder="Post"
            error={state.errors?.body ? true : false}
            helperText={state.errors?.body}
            className={classes.textField}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading}
            className={classes.createPost}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionToProps = {
  createPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CreatePost));

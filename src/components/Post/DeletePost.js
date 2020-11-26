import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import { Button, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

const styles = {};

const DeletePost = ({ postId, deletePost, classes }) => {
  const [state, setState] = useState({ open: false });

  const handleOpen = () => {
    setState({ open: true });
  };

  const handleClose = () => {
    setState({ open: false });
  };

  const delPost = () => {
    postId && deletePost(postId);
    setState({ open: false });
  };

  return (
    <>
      <MyButton
        tip="Delete Post"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={delPost} color="primary" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapActionToProps = {
  deletePost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DeletePost));

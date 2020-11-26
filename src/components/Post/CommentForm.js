import React, { useState } from "react";
import { connect } from "react-redux";
import { Box, TextField, Button } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import { submitComment } from "../../redux/actions/dataActions";

const styles = ({ theme }) => ({
  ...theme,
});

const CommentForm = (props) => {
  const { classes, postId, authenticated, submitComment } = props;
  const [state, setState] = useState({
    body: "",
  });

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    submitComment(postId, { body: state.body });
    setState({ body: "" });
  };

  return (
    <>
      {authenticated ? (
        <Box>
          <form>
            <TextField
              margin="dense"
              variant="outlined"
              fullWidth
              name="body"
              type="text"
              label="Comment on post"
              multiline
              rows="2"
              placeholder="Type your comment here..."
              className={classes.textField}
              value={state.body}
              onChange={handleChange}
            />
            <Button onClick={handleSubmit} color="primary" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionToProps = { submitComment };

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(CommentForm));

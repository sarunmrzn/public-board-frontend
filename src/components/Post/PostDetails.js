import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Close, UnfoldMore } from "@material-ui/icons";
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";
import Like from "./Like";
import Comment from "./Comment";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const styles = ({ theme }) => ({
  ...theme,
  postDetailsContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  postImgContainer: {
    width: "20%",
  },
  postImg: {
    height: 100,
    widht: 100,
    borderRadius: "50%",
  },
  postDetails: {
    width: "70%",
  },
  postStatus: {
    display: "flex",
  },
});

const PostDialog = (props) => {
  const {
    classes,
    postId,
    post: { body, createdAt, userImage, comments },
    likeCount,
    commentCount,
    UI: { loading },
    getPost,
    username,
  } = props;

  const [state, setState] = useState({ open: false, oldPath: "", newPath: "" });

  useEffect(() => {
    props.openDialog && handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openDialog]);

  const handleOpen = () => {
    let oldPath = window.location.pathname;
    const newPath = `/users/${username}/post/${postId}`;
    if (oldPath === newPath) oldPath = `/users/${username}`;
    window.history.pushState(null, null, newPath);
    setState({ open: true, oldPath, newPath });
    getPost(postId);
  };

  const handleClose = () => {
    window.history.pushState(null, null, state.oldPath);
    setState({ open: false });
  };

  return (
    <>
      <MyButton
        onClick={handleOpen}
        tip="Open Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={state.open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box className={classes.diaglogTitle}>
            <Box>Post Details</Box>
            <MyButton
              tip="Close"
              onClick={handleClose}
              tipClassName={classes.closeButton}
            >
              <Close />
            </MyButton>
          </Box>
        </DialogTitle>
        <DialogContent className={classes.diaglogContent}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Box className={classes.postDetailsContainer}>
              <Box className={classes.postImgContainer}>
                <img
                  src={userImage}
                  alt="Profile"
                  className={classes.postImg}
                />
              </Box>
              <Box className={classes.postDetails}>
                <Typography
                  component={Link}
                  color="primary"
                  variant="h5"
                  to={`/users/${props.post.username}`}
                >
                  @{props.post.username}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                </Typography>
                <Typography variant="body1">{body}</Typography>
                <Box className={classes.postStatus}>
                  <Like count={likeCount} postId={postId} />
                  <Comment count={commentCount} postId={postId} />
                </Box>
                <hr />
                <CommentForm postId={postId} />
                <Comments comments={comments} />
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
});

const mapActionToProps = {
  getPost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostDialog));

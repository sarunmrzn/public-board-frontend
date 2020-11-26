import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { likePost, unlikePost } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";

const styles = ({ theme }) => ({
  ...theme,
  iconTextCombo: {
    display: "flex",
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

const Like = (props) => {
  const {
    classes,
    user: { authenticated, likes },
    count,
    postId,
  } = props;

  const likePost = () => {
    props.likePost(postId);
  };
  const unlikePost = () => {
    props.unlikePost(postId);
  };

  return (
    <Box className={classes.iconTextCombo}>
      <Box>
        {!authenticated ? (
          <MyButton tip="Like">
            <Link to="/login">
              <FavoriteBorder />
            </Link>
          </MyButton>
        ) : likes?.find((like) => like.postId === postId) ? (
          <MyButton tip="Unlike" onClick={unlikePost}>
            <Favorite color="primary" />
          </MyButton>
        ) : (
          <MyButton tip="Like" onClick={likePost}>
            <FavoriteBorder />
          </MyButton>
        )}
      </Box>
      <Box style={{ display: "flex", alignItems: "center" }}>{count} Likes</Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  post: state.data.post,
});

const mapActionToProps = {
  likePost,
  unlikePost,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Like));

import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { connect } from "react-redux";
import relativeTime from "dayjs/plugin/relativeTime";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@material-ui/core";

import DeletePost from "./DeletePost";
import PostDetails from "./PostDetails";
import Like from "./Like";
import Comment from "./Comment";

const styles = ({ theme }) => ({
  ...theme,
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    margin: "30px 10px 10px 10px",
  },
  content: {
    padding: 8,
    objectFit: "cover",
  },
  cardContent: {
    width: "80%",
  },
  cardContentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardContentFooter: {
    display: "flex",
    alignItem: "center",
    justifyContent: "space-between",
  },
});

const Post = (props) => {
  dayjs.extend(relativeTime);
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      username,
      postId,
      likeCount,
      commentCount,
    },
    user: { authenticated, credentials },
  } = props;

  const deleteButton = authenticated && credentials.username === username && (
    <DeletePost postId={postId} className={classes.delete} />
  );

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.cardContent}>
        <Box className={classes.cardContentHeader}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${username}`}
            color="primary"
          >
            {username}
          </Typography>
          {deleteButton}
        </Box>

        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <Box className={classes.cardContentFooter}>
          <Like count={likeCount} postId={postId} />
          <Comment count={commentCount} postId={postId} />
          <PostDetails
            postId={postId}
            username={username}
            likeCount={likeCount}
            commentCount={commentCount}
            openDialog={props.openDialog}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Post));

import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import axios from "axios";
import { Box } from "@material-ui/core";
import Post from "../components/Post";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/Profile/StaticProfile";

const styles = ({ theme }) => ({
  ...theme,
});

const User = (props) => {
  const {
    match,
    getUserData,
    data: { posts },
  } = props;

  const [postIdParam, setPostIdParam] = useState(null);

  useEffect(() => {
    const postId = match.params.postId;
    postId && setPostIdParam(postId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.postId]);

  const [state, setState] = useState({
    profile: null,
  });

  useEffect(() => {
    const username = match.params.username;
    getUserData(username);
    axios
      .get(`/user/${username}`)
      .then((res) => {
        setState({ profile: res.data.user });
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.username]);

  return (
    <Box>
      <Box>{state.profile && <StaticProfile profile={state.profile} />}</Box>
      <Box>
        {!postIdParam ? (
          <>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </>
        ) : (
          <>
            {posts?.map((post) => {
              if (post.postId !== postIdParam) {
                return <Post key={post.id} post={post} />;
              } else {
                return <Post key={post.id} post={post} openDialog={true} />;
              }
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionToProps = {
  getUserData,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(User));

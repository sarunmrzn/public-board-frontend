import React, { useEffect } from "react";
import Box from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

import Post from "../components/Post";
import Profile from "../components/Profile";

const styles = ({ theme }) => ({
  ...theme,
});

const Home = (props) => {
  const {
    data: { posts, loading },
    getPosts,
    classes,
  } = props;
  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.homeContainer}>
      <Box className={classes.profileSection}>
        <Profile />
      </Box>
      <Box className={classes.postsSection}>
        {loading ? (
          posts?.map((post, ind) => {
            return <Post key={ind} post={post} />;
          })
        ) : (
          <p>Loading</p>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  data: state?.data,
});

const mapActionToProps = {
  getPosts,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Home));

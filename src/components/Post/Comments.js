import React from "react";
import { Box, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";

const styles = ({ theme }) => ({
  ...theme,
  commentContainer: {
    display: "flex",
    margin: "16px",
    borderBottom: "1px solid rgba(0, 0, 0 , 0.1)",
  },
  commentImg: {
    height: 69,
    width: 69,
    marginRight: 16,
    borderRadius: "50%",
  },
});
const Comments = ({ classes, comments }) => {
  return (
    <Box>
      {comments?.map(({ body, createdAt, userImage, username }, ind) => {
        return (
          <Box key={ind} className={classes.commentContainer}>
            <Box>
              <img
                src={userImage}
                alt="commentImg"
                className={classes.commentImg}
              />
            </Box>
            <Box>
              <Typography variant="body1" color="primary">
                {username}
              </Typography>
              <Typography variant="body2">
                <small>{dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}</small>
              </Typography>
              <Typography variant="body2">{body}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default withStyles(styles)(Comments);

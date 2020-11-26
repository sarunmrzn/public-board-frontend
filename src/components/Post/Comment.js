import React from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { Box } from "@material-ui/core";
import { ChatBubble } from "@material-ui/icons";
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

const Comment = (props) => {
  const { classes, count } = props;
  return (
    <Box className={classes.iconTextCombo}>
      <MyButton tip="comments">
        <ChatBubble color="primary" />
      </MyButton>
      <Box style={{ display: "flex", alignItems: "center" }}>
        {count} Comments
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({});

const mapActionToProps = {};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Comment));

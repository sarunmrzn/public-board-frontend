const theme = {
  palette: {
    primary: {
      light: "#8561c5",
      main: "#673ab7",
      dark: "#482880",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#000",
    },
  },
  theme: {
    mainContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "80px auto 0px auto",
      width: "1000px",
    },
    mainForm: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: "20px",
      width: "50%",
    },
    formTitle: {
      textAlign: "center",
      margin: "20px",
    },
    submitForm: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    submitButton: {
      margin: "10px 0",
    },
    generalError: { color: "red" },

    homeContainer: {
      display: "flex",
      justifyContent: "space-between",
      margin: "80px auto 0px auto",
      width: "1000px",
    },
    profileSection: {
      width: "25%",
    },
    postsSection: {
      width: "70%",
    },
    profile: {
      minHeight: "400px",
    },
    profileImgWrapper: {
      display: "flex",
      justifyContent: "center",
      padding: "10px 0",
    },
    profileImg: {
      height: "200px",
      width: "200px",
      borderRadius: "50%",
    },
    profileImgButtons: {
      textAlign: "right",
    },
    profileDetails: {
      display: "flex",
      flexDirection: "column",
      padding: "0 10px",
    },
    profileCentered: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
    iconTextCombo: {
      marginTop: "8px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 16px",
    },

    loginSignup: {
      display: "flex",
      padding: "10px",
      justifyContent: "space-between",
      alignItems: "center",
    },
    diaglogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0 !important",
    },
    dialogContent: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

export default theme;

import { createMuiTheme } from "@material-ui/core";

const colors = {
  red: {
    //Red Team + Logged in Users chat bubble
    light: "#e6918a",
    medium: "#f86255",
  },
  blue: {
    // Blue Team
    light: "#72b2ed",
    medium: "#3a98f1",
  },
  grey: {
    // Background
    superLight: "#f8f7f6",
    // for clicked clue button
    light: "#ebf1f8",
    // other users' chat bubbles
    medium: "#ebebeb",
    // innocent color text,
    mediumDark: "#bfbfbf",
    // "Send Invite" on new game + "Make Your Move"
    dark: "#5d5d5d",
  },
  // "Copy" Button for new game link
  white: "#ffffff",
  black: "#000000",
};

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
    button: {
      textTransform: "none",
    },
    h1: {
      fontSize: "2rem",
      fontWeight: 400,
      padding: 0,
      margin: 0,
    },
    h3: {
      fontSize: "1.1rem",
      fontWeight: 600,
      padding: 0,
      margin: 0,
    },
  },

  red: colors.red,
  blue: colors.blue,
  grey: colors.grey,
  white: colors.white,
  black: colors.black,
  palette: {
    primary: { main: "#32be72", contrastText: "#fff" }, // This is Green, for "Create Game", "New Game", "Done"
  },
});

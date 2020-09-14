import { createMuiTheme } from "@material-ui/core";
 
export const theme = createMuiTheme({
  typography: {
    fontFamily: "Roboto",
    fontSize: 12,
    button: {
      textTransform: "none"
    },
  },
  palette: {
    primary: { main: "#32be72", contrastText: "#fff" }, // "Create Game", "New Game", "Done"
    background: { main: "#f8f7f6" }, // grey background
    redTeam: { main: "#f86255" },
    blueTeam: { main: "#3a98f1" },
    darkGrey: { main: "#5d5d5d" }, // "Make Your Move"
    lightGrey1: { main: "#ebebeb" }, // for clicked clue button
    lightGrey2: { main: "#ebf1f8" }, // other users' chat bubbles + "Send Invite" on new game
    redChat: { main: "#f86155" }, // logged in user's chat bubble
    white: { main: "#FFFFFF" }
  },
});

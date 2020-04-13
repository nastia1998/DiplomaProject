import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

export default {
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    height: "83vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 567,
  },
  requеstsList: {
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: theme.spacing(2),
    // alignItems: "center",
  },
};

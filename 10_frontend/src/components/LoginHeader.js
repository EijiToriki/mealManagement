import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

const LoginHeader = () => {
  return (
    <AppBar position="absolute">
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          noWrap
          fontWeight="bold"
          sx={{ flexGrow: 1 }}
        >
          ショクカン ~ 食事管理アプリ ~
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default LoginHeader
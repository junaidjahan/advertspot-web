import { Route, Routes } from "react-router-dom";
import { Login } from "./login/Login";
import { Signup } from "./signup/Signup";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

export const Auth = () => {
  return (
    <div>
      <Grid
        container
        alignItems="stretch"
        direction="row"
        justifyContent="center"
        sx={{ height: "100%", position: "absolute" }}
      >
        <Grid sx={{ bgcolor: "primary.main" }} item xs={12} md={6}>
          <Box>
            <img width="90%" height="90%" src="/freelancer.png" alt="" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Grid>
      </Grid>
    </div>
  );
};

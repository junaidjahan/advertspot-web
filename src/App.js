import "./styles/index.scss";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./styles/theme/theme";
import { User } from "./pages/user/User";
import { Auth } from "./pages/auth/Auth";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <User />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;

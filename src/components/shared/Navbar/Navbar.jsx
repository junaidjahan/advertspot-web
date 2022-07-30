import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material";
import { BaseButton } from "../../base";

export const Navbar = () => {
  const buttons = [
    {
      text: "Home",
      variant: "text",
    },
    {
      text: "Browse",
      variant: "text",
    },
    {
      text: "About",
      variant: "text",
    },
    {
      text: "Contact us",
      variant: "text",
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="white" position="static">
        <Toolbar variant="dense">
          <Container
            maxWidth="lg"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src="/logo.png" width={50} />
            <Box>
              {buttons.map((button, index) => {
                return (
                  <BaseButton size="small" key={index}>
                    {button.text}
                  </BaseButton>
                );
              })}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

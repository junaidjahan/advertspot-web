import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IntroCard } from './IntroCard';
import Stack from '@mui/material/Stack';

export const CardWrapper = () => {
  return (
    <div style={{marginTop:5}}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}

      >
          <IntroCard />
         
      </Stack>
    </div>
  );
};

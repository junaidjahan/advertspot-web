import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { ReviewCard } from "./index";

export const Stack = () => {
  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Item>
          <ReviewCard />
        </Item>
        <Item>
          <ReviewCard />
        </Item>
        <Item>
          <ReviewCard />
        </Item>
      </Stack>
    </div>
  );
};

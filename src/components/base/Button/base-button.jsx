import { Button } from "@mui/material";

export const BaseButton = ({ variant, ...props }) => {
  return (
    <Button
      variant={variant ? variant : "text"}
      sx={{ borderRadius: 1 }}
      {...props}
    ></Button>
  );
};

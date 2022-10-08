import { TextField } from "@mui/material";

export const BaseTextField = ({ label, ...props }) => {
  return (
    <TextField
      variant="outlined"
      color="primary"
      size="small"
      label={label}
      sx={{
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          font: "revert",
        },
        "& .MuiInputLabel-root": {
          font: "revert",
        },
      }}
      {...props}
    />
  );
};

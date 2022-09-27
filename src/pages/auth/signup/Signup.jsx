import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BaseButton, BaseTextField } from "../../../components/base";

export const Signup = () => {
  return (
    <Box sx={style.container}>
      <Box sx={style.signupForm}>
        <Box sx={{ textAlign: "center" }}>
          <h2 className="primary" style={style.title}>
            Create an account
          </h2>
        </Box>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label=" First Name" />
            </Box>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label=" Last Name" />
            </Box>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label=" Email" />
            </Box>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label=" Phone Number" />
            </Box>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label="Password" />
            </Box>
            <Box>
              <BaseTextField fullWidth label="Confirm Password" />
            </Box>
            <Box sx={style.button}>
              <BaseButton variant="contained" fullWidth={true} size="small">
                Signup
              </BaseButton>
            </Box>
            <Box sx={style.anchorContainer}>
              <p>
                Already have an Account? <Link to="/auth/login">Login</Link>
              </p>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const style = {
  container: {
    padding: "10px",

    px: "40px",
    pt: "20px",
    height: "100%",
  },
  signupForm: {
    border: "1px solid",
    borderColor: "grey.light",
    borderRadius: "10px",
    px: "10px",
  },
  formCenter: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    py: "20px",
  },
  textField: {
    my: "10px",
  },
  button: {
    my: "10px",
  },
  title: {
    marginBottom: "0px",
    fontSize: "2rem",
    fontWeight: "600",
  },
  anchorContainer: {
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

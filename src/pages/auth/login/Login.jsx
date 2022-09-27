import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BaseButton, BaseTextField } from "../../../components/base";
import { Signup } from "../signup/Signup";

export const Login = () => {
  return (
    <Box sx={style.container}>
      <Box sx={style.loginForm}>
        <Box sx={{ textAlign: "center" }}>
          <h2 className="dark-grey" style={style.title}>
            Welcome Back
          </h2>
        </Box>
        {/* <Box sx={style.formCenter}> */}
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={style.textField}>
              <BaseTextField fullWidth label=" Email" />
            </Box>
            <Box>
              <BaseTextField fullWidth label="Password" />
            </Box>
            <Box sx={style.button}>
              <BaseButton variant="contained" fullWidth={true} size="small">
                Login
              </BaseButton>
            </Box>
            <Box sx={style.anchorContainer}>
              <p>
                Don't have an Account? <Link to="/auth/signup">Sign Up</Link>
              </p>
            </Box>
          </Grid>
        </Grid>
        {/* </Box> */}
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
  loginForm: {
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
    fontSize: "30px",
    fontWeight: "600",
  },
  anchorContainer: {
    marginTop: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

import React from "react";
import { CardWrapper } from "../../../components/CardWrapper";

import Grid from '@mui/material/Grid';
export const Home = () => {
  return <div >
  <Grid height={'30%'} container spacing={2}>
  <Grid item  xs={4}>
  <CardWrapper /> 
  </Grid>
  <Grid item xs={8}>
  <div > </div>

  </Grid>
 
</Grid> 
   
  </div>;
};

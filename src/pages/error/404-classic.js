import React from "react";
// import PageContainer from "../../layout/page-container/PageContainer";
import { Link } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";

const Error404Classic = () => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <Typography variant="h1" component="h1" gutterBottom>
          404
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h3" gutterBottom>
          Oops! Why are you here?
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" gutterBottom>
          We are very sorry for the inconvenience. It looks like you’re trying to access a page that
          either has been deleted or never existed.
        </Typography>
      </Grid>
      <Grid item>
        <Link to={`/dashboard`} style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary" size="large">
            Back To Home
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default Error404Classic;

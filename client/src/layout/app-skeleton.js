import { Grid, Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const PageLoader = ({ loading, children }) => {
  return (
    <Box>
      {loading ? (
        Array(3)
          .fill("-")
          .map((element, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Grid>
          ))
      ) : (
        <Box>{children}</Box>
      )}
    </Box>
  );
};

export default PageLoader;

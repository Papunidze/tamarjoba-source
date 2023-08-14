import { LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Loading = ({ loading, children }) => {
  return (
    <Box sx={{ width: "100%" }}>
      {loading ? <LinearProgress /> : <Box>{children}</Box>}
    </Box>
  );
};

export default Loading;

import { Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";

const PageLayout = ({ children }) => {
  return (
    <Paper variant={dictionary.paperVaraint} square sx={{ ...styles.paper }}>
      <Container>{children}</Container>
    </Paper>
  );
};

export default PageLayout;

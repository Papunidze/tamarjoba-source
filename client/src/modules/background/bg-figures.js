import { Box } from "@mui/material";
import React from "react";
import styles from "./styles/styles";

const GlassFigure = () => {
  return (
    <Box sx={{ ...styles.glassFigureParent }}>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureOne }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureTwo }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureThree }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureFour }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureFive }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureSix }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureSeven }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureEight }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureNine }}></Box>
      <Box sx={{ ...styles.glassFigure, ...styles.glassFigureTen }}></Box>
    </Box>
  );
};

export default GlassFigure;

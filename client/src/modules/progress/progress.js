import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./styles/styles";
import dictionary from "./styles/dictionary";

const CustomProgressBar = ({ value, length }) => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.childrenContainer }}>
        <LinearProgress
          variant={dictionary.progresVar}
          value={value * (100 / length)}
          sx={{ ...styles.linearProgress }}
        />
        <Typography variant={dictionary.txtVariant}>{`${Math.round(
          value * (100 / length)
        )}%`}</Typography>
      </Box>
    </Box>
  );
};
export default CustomProgressBar;

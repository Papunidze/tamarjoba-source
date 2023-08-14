import { linearProgressClasses } from "@mui/material";
import { _dominationColor } from "../../../themes";

const styles = {
  mainContainer: {
    width: "100%",
  },
  childrenContainer: {
    display: "flex",
    alignItems: "center",
    gap: 1,
  },
  linearProgress: {
    width: "100%",
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      background: "rgba( 247, 113, 113, 0.45 )",
      backdropFilter: "blur( 20px )",
      WebkitBackdropFilter: "blur( 20px )",
    },
    "& .MuiLinearProgress-bar": {
      borderRadius: 5,
      background: _dominationColor,
      border: "none",
      backdropFilter: "blur( 20px )",
      WebkitBackdropFilter: "blur( 20px )",
    },
  },
};
export default styles;

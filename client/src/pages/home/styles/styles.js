import { _complement, _dominationColor, _hoverColor } from "../../../themes";

const styles = {
  mainContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  btn: {
    borderRadius: "5px",
    color: _complement,
    background: _dominationColor,
    fontWeight: "700",

    margin: "auto",
    width: 144,
    boxShadow: "0 12px 35px 0 rgba(255, 235, 167, 0.15)",
    "&:hover": {
      background: _hoverColor,
    },
  },
};
export default styles;

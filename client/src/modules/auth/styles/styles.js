import {
  _accent,
  _complement,
  _dominationColor,
  _hoverColor,
} from "../../../themes";

const styles = {
  authPaper: {
    boxShadow: "none",
  },
  authBtn: {
    borderRadius: "5px",
    color: _complement,
    background: _dominationColor,
    fontWeight: "700",
    boxShadow: "0 12px 35px 0 rgba(255, 235, 167, 0.15)",
    "&:hover": {
      background: _hoverColor,
    },
  },
  recoverBtn: {
    color: _accent,
    textDecoration: "underline",
    userSelect: "none",
    cursor: "pointer",
    width: "fit-content",
  },
};
export default styles;

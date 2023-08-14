import { _complement } from "../../themes";

const styles = {
  paper: {
    border: "1px solid #EDEEF2",
    p: 1,
    mt: 2,
    background: _complement,
  },
  appBar: {
    background: "transparent",
    color: "crimson",
    border: "none",
    boxShadow: "none",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    textAlign: "center",
  },
  iconBtn: {
    p: 0,
    cursor: "pointer",
    zIndex: 5,
    "&:hover": {
      borderRadius: 5,
    },
    "&:active": {
      borderRadius: 5,
    },
    "&:focus": {
      borderRadius: 5,
    },
  },
  Avatar: {
    background: "crimson",
    width: "30px",
    height: "30px",
  },
  settingBtn: {
    display: "flex",
    gap: 0.5,
    color: "black",
    alignItems: "center",
    textAlign: "center",
    "&:hover": {
      borderRadius: 5,
    },
    "&:active": {
      borderRadius: 5,
    },
    "&:focus": {
      borderRadius: 5,
    },
  },
};
export default styles;

import { _complement, _dominationColor } from "../../../themes";

const styles = {
  startContainer: {
    position: "fixed",
    width: "100%",
    height: "100%",
    display: "flex",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
    fontWeight: "700",
  },
  mainContainer: {
    border: "2px solid black",
    width: "100%",
    height: "25px",
  },
  textBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  questBtn: {
    width: "100%",
    color: "black",
  },
  nextBtn: {
    borderRadius: "5px",
    color: _complement,
    background: _dominationColor,
    fontWeight: "700",
    margin: "auto",
    width: "fit-content",
    boxShadow: "0 12px 35px 0 rgba(255, 235, 167, 0.15)",
  },
  headContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
  },
  bodyContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 1,
  },
  answerContainer: {
    placeItems: "center",
    placeContent: "center",
  },
  timerText: {
    fontWeight: 700,
  },
};
export default styles;

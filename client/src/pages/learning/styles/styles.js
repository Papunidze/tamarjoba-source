import { _complement } from "../../../themes";

const styles = {
  textBox: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    wordBreak: "break-all",
    overflow: "hidden",
  },
  questBtn: (check, cor, answer, index) => ({
    background: "tranparent",
    width: "100%",
    color: "black",
    fontWeight: "bold",
    "&[disabled]": {
      color: "black",
      background:
        !check && answer === "" && cor === index
          ? "#FF0029"
          : !check && answer && cor === answer && index === answer
          ? "#07DE00"
          : cor !== answer && index === cor
          ? "#07DE00"
          : index === answer && "#FF0029",
    },
  }),
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    textAlign: "center",
    p: 1,
  },
  btnMove: {
    borderRadius: "5px",
    color: _complement,

    fontWeight: "700",
    margin: "auto",
    width: "fit-content",
    boxShadow: "0 12px 35px 0 rgba(255, 235, 167, 0.15)",
  },
  titleMenuCont: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0.5,
    width: "100%",
    justifyContent: "space-between",
  },
  toolTip: {
    fontSize: "large",
  },
  headContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  timerText: {
    fontWeight: 700,
  },
  answerContainer: {
    placeItems: "center",
    placeContent: "center",
  },
  bodyContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 1,
  },
};

export default styles;

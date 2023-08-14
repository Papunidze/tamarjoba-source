const styles = {
  //burgermenu
  mainBox: {
    width: 250,
  },
  listItem: (color, select) => ({
    background: select ? "#CACACA" : color ? "#20E744" : "transparent",
    display: "block",
    maxWidth: "100%",
    width: "100%",
    padding: "10px",
  }),
  appHeader: {
    position: "relative",
    background: "crimson",
  },
  listText: {
    "> .MuiTypography-root": {
      overflow: "hidden",
      letterSpacing: ".09px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },
  },
  flexContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  resultText: {
    fontStyle: "bold",
  },
  titleText: {
    p: 1,
    fontWeight: "600",
    fontColor: "#444",
  },
  answerBox: {
    width: "100%",
    alignItems: "start",
  },
  answerText: {
    marginLeft: 2,
    padding: "0.2rem 1rem",
  },
  checkedAnswer: {
    marginLeft: 2,
    padding: "0.2rem 1rem",
    textAlign: "center",
    borderRadius: "5px",
    fontWeight: "900",
    fontStyle: "bold",
    color: "#3f50b5",
    backgroundColor: "#cdd4e0",
  },
  resultBox: {
    p: 1,
    display: "flex",
    textalign: "center",
    alignItems: "center",
    gap: 1,
  },
  wrongBox: {
    justifyContent: "center",
    alignItems: "center",
    textalign: "center",
  },
  wrongText: {
    p: 1,
    display: "flex",
    textalign: "center",
    alignItems: "center",
  },
  correctAnswer: {
    fontWeight: "700",
    fontStyle: "bold",
    display: "flex",
    flexDirection: "center",
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    marginLeft: 3,
  },
};
export default styles;

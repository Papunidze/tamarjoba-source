import { _dominationColor } from "../../../themes";

const styles = {
  //glassFigure styles
  glassFigureParent: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    overflow: "hidden",
    zIndex: -2,
  },
  glassFigure: {
    position: "absolute",
    display: "block",
    listStyle: "none",
    width: "20px",
    height: "20px",
    background: _dominationColor,
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
    backdropFilter: " blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "80px",
    border: " 1px solid rgba(255, 255, 255, 0.18)",
    animation: "animate 25s linear infinite",
    bottom: "-150px",
    zIndex: -1,
  },
  glassFigureOne: {
    left: "25%",
    width: "80px",
    height: "80px",
    animationDelay: "0s",
  },
  glassFigureTwo: {
    left: "10%",
    width: "20px",
    height: "20px",
    animationDelay: "2s",
    animationDuration: "12s",
  },
  glassFigureThree: {
    left: "70%",
    width: "20px",
    height: "20px",
    animationDelay: "4s",
  },
  glassFigureFour: {
    left: "40%",
    width: "60px",
    height: "60px",
    animationDelay: "0s",
    animationDuration: "18s",
  },
  glassFigureFive: {
    left: "65%",
    width: "20px",
    height: "20px",
    animationDelay: "0s",
  },
  glassFigureSix: {
    left: "75%",
    width: "110px",
    height: "110px",
    animationDelay: "3s",
  },
  glassFigureSeven: {
    left: "35%",
    width: "150px",
    height: "150px",
    animationDelay: "7s",
  },
  glassFigureEight: {
    left: "50%",
    width: "25px",
    height: "25px",
    animationDelay: "45s",
    animationDuration: "45s",
  },
  glassFigureNine: {
    left: "20%",
    width: "15px",
    height: "15px",
    animationDelay: "2s",
    animationDuration: "35s",
  },
  glassFigureTen: {
    left: "85%",
    width: "150px",
    height: "150px",
    animationDelay: "0s",
    animationDuration: "11s",
  },
};
export default styles;

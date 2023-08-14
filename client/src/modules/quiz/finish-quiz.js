import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import styles from "./styles/styles";

const FinishQuiz = ({ open, quiz, personAnswer }) => {
  const navigate = useNavigate();
  let counter = 0;
  quiz.map(
    (element, index) =>
      element.correctanswer === personAnswer[index] && counter++
  );
  return (
    <Dialog
      open={open}
      onClose={() => navigate("/")}
      sx={{ ...styles.dialogStyle }}
    >
      <IconButton onClick={() => navigate("/")} sx={{ ...styles.closeButton }}>
        <CloseIcon />
      </IconButton>

      <DialogTitle sx={{ ...styles.dialogText }}>{"Tამარჯობა"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText sx={{ ...styles.dialogText }}>
          ტესტირება დასრულებულია!
        </DialogContentText>
        <DialogContentText sx={{ ...styles.dialogText }}>
          თქვენი შედეგი {counter} / 30
        </DialogContentText>
        <DialogContentText sx={{ ...styles.dialogText }}>
          დამატებითი ინფორმაცია გადმოგზავნილია ელექტრონულ ფოსტაზე
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default FinishQuiz;

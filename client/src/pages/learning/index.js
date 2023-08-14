import {
  Button,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PageLayout from "../../layout/app-page";
import BurgerMenu from "../../modules/learnian/burgermenu";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import CustomProgressBar from "../../modules/progress/progress";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../action/quest";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import LanguageIcon from "@mui/icons-material/Language";
import { displayToast } from "../../util/alert";
import Finish from "../../modules/learnian/finish-learning";
import PageLoader from "../../layout/app-skeleton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Swal from "sweetalert2";
const Learning = () => {
  const dispatch = useDispatch();
  useState(() => {
    dispatch(fetchAll());
  }, [dispatch]);
  const questions = useSelector((action) => action.questReducer);
  const urlParams = new URLSearchParams(window.location.search);
  const [counter, setCounter] = useState(
    Number(localStorage.getItem("counter")) || 0
  );
  const [language, setLanguage] = React.useState(false);
  const [answer, setAnswer] = useState(
    localStorage.getItem("answer") || Array(questions?.length).fill("")
  );
  const [chechkAnswer, setCheckAnswer] = useState(
    JSON.parse(localStorage.getItem("checked")) || []
  );
  const [open, setOpen] = useState(false);
  useEffect(() => {
    questions.allQuest.length > 0 &&
      setAnswer(
        JSON.parse(localStorage.getItem("answer")) ||
          Array(questions.allQuest?.length).fill("")
      );
  }, [questions.allQuest, questions.allQuest.length]);
  useEffect(() => {
    localStorage.setItem("counter", counter);
  }, [answer, counter]);
  const token = urlParams.get("ru");
  const handleMove = (operator) => {
    setLanguage(false);
    operator ? setCounter(counter + 1) : setCounter(counter - 1);

    if (counter >= questions.allQuest.length - 1 && operator) {
      displayToast(`გთხოვთ გაეცით ყველა კითხვას პასუხი`, "error", "crimson");
      setCounter(questions.allQuest.length - 1);
    } else if (counter < 1 && !operator) {
      setCounter(0);
      displayToast(`უკან წასვლა შეუძლებელია`, "error", "crimson");
    }
    let finish = 0;
    answer.map((e) => e && finish++);
    finish === questions.allQuest.length && setOpen(true);
  };
  const handleReset = () => {
    Swal.fire({
      title: "დარწმუნებულიხარ, რომ გსურთ შედეგების გასუფთავება?",
      text: "თქვენ ვეღარ შეძლებთ დაბრუნებას",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "კი",
      cancelButtonText: "არა",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("counter");
        localStorage.removeItem("answer");
        localStorage.removeItem("checked");
        window.location.reload();
      }
    });
  };
  const handleCheck = () => {
    if (answer[counter] === "") {
      displayToast(`აირჩიეთ პასუხი`, "error", "crimson");
    } else {
      setCheckAnswer(() => {
        const newArray = [...chechkAnswer];
        questions.allQuest[counter]?.correctanswer === answer[counter]
          ? (newArray[counter] = "green")
          : (newArray[counter] = "red");
        localStorage.setItem("checked", JSON.stringify(newArray));
        return newArray;
      });
    }
    localStorage.setItem("answer", JSON.stringify(answer));
  };

  return (
    <PageLayout>
      <Stack gap={dictionary.mainSpace}>
        <PageLoader loading={questions.isLoading}>
          <Box sx={{ ...styles.textBox }}>
            <Stack sx={{ ...styles.headContainer }}>
              <Stack
                sx={{
                  ...styles.titleMenuCont,
                }}
              >
                <BurgerMenu
                  quest={questions.allQuest}
                  setCounter={setCounter}
                  answer={answer}
                  setLanguage={setLanguage}
                  counter={counter}
                />

                <Stack flexDirection="row" gap={0.5}>
                  <IconButton
                    variant={dictionary.buttonVariant}
                    color={dictionary.buttonColor}
                    sx={{ ...styles.btnMove }}
                    onClick={handleReset}
                  >
                    <RestartAltIcon color="error" />
                  </IconButton>
                  {token && (
                    <IconButton onClick={() => setLanguage(!language)}>
                      <LanguageIcon />
                    </IconButton>
                  )}

                  <IconButton onClick={handleCheck}>
                    <LightbulbIcon />
                  </IconButton>
                </Stack>
              </Stack>
              <Typography variant={dictionary.questCounterText}>
                კითხვა {questions.allQuest[counter]?.counter}.
                {questions.allQuest[counter]?.section}/
                {questions.allQuest.length}
              </Typography>
            </Stack>
          </Box>
          <Stack sx={{ ...styles.bodyContainer }}>
            <CustomProgressBar
              value={counter}
              length={questions.allQuest?.length}
            />
            <Typography variant={dictionary.questTitle}>
              {questions.allQuest[counter]?.title}
            </Typography>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
              sx={{ ...styles.answerContainer }}
            >
              {questions.allQuest[counter]?.answer.map((element, index) => (
                <Grid item xs={6} key={index}>
                  <Button
                    variant={
                      answer[counter] && answer[counter] === index + 1
                        ? dictionary.activeVariant
                        : dictionary.buttonVariant
                    }
                    color={
                      answer[counter] && answer[counter] === index + 1
                        ? dictionary.activeColor
                        : dictionary.buttonColor
                    }
                    sx={{
                      ...styles.questBtn(
                        !chechkAnswer[counter],
                        questions.allQuest[counter]?.correctanswer,
                        answer[counter],
                        index + 1
                      ),
                    }}
                    disabled={chechkAnswer[counter] ? true : false}
                    onClick={() =>
                      setAnswer(() => {
                        const answerArray = [...answer];
                        answerArray[counter] = index + 1;
                        localStorage.setItem("answer", JSON.stringify(answer));
                        return answerArray;
                      })
                    }
                  >
                    {element}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Stack sx={{ ...styles.btnContainer }}>
              <IconButton
                variant={dictionary.buttonVariant}
                color={dictionary.buttonColor}
                sx={{ ...styles.btnMove }}
                onClick={() => handleMove(false)}
              >
                <ArrowBackIosIcon color="error" />
              </IconButton>
              <IconButton
                variant={dictionary.buttonVariant}
                color={dictionary.buttonColor}
                sx={{ ...styles.btnMove }}
                onClick={() => handleMove(true)}
              >
                <ArrowForwardIosIcon color="error" />
              </IconButton>
            </Stack>
          </Stack>
          {language && (
            <TextField
              fullWidth
              multiline
              minRows={4}
              maxRows={9}
              sx={{
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
              value={questions.allQuest[counter]?.content}
              readonly
              size={dictionary.inputSize}
            />
          )}
          {open && (
            <Finish open={open} question={questions.allQuest} answer={answer} />
          )}
        </PageLoader>
      </Stack>
    </PageLayout>
  );
};

export default Learning;

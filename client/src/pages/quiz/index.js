import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PageLayout from "../../layout/app-page";
import CustomProgressBar from "../../modules/progress/progress";
import Timer from "../../util/timer";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { getQuest, sendResult } from "../../action/quest";
import FinishQuiz from "../../modules/quiz/finish-quiz";
import { START_LOADING_QUEST } from "../../layout/app-action";
import PageLoader from "../../layout/app-skeleton";
const Quiz = () => {
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState(Array(30).fill(""));
  const [finish, setFinish] = useState(false);
  const [start, setStart] = useState(false);
  const quiz = useSelector((action) => action.questReducer);
  var time = Timer();
  const handleClick = () => {
    if (quiz.Quiz?.length !== counter + 1) {
      setCounter(counter + 1);
    } else {
      setFinish(true);

      const id = { _id: JSON.parse(localStorage.getItem("profile")).user.id };
      const personAnswer = { personAnswer: answer };
      let counter = 0;
      quiz.Quiz.map(
        (element, index) => element.correctanswer === answer[index] && counter++
      );
      const finalResult = Object.assign(
        id,
        personAnswer,
        { Quiz: quiz.Quiz },
        { time: time },
        { result: counter }
      );

      dispatch(sendResult(finalResult));
    }
  };

  const handleSubmit = async () => {
    try {
      dispatch({ type: START_LOADING_QUEST });
      dispatch(getQuest());

      setStart(true);
    } catch (err) {}
  };
  return !start ? (
    <Box sx={{ ...styles.startContainer }}>
      <PageLayout>
        <Stack gap={dictionary.mainSpace}>
          <Typography sx={{ ...styles.timerText }}>
            ქვიზი შედგება 30 კითხვისგან
          </Typography>
          <Typography sx={{ ...styles.timerText }}>
            ქვიზის შედეგი გადმოგეგზავნებათ თქვენს ელექტრონულ ფოსტაზე
          </Typography>
          <Typography sx={{ ...styles.timerText }}>
            გისრუვებთ წარმატებას
          </Typography>
          <Button
            onClick={handleSubmit}
            sx={{ ...styles.nextBtn }}
            variant="contained"
            color="error"
          >
            ტესტირების დაწყება
          </Button>
        </Stack>
      </PageLayout>
    </Box>
  ) : (
    <PageLayout>
      <Stack gap={dictionary.mainSpace}>
        <PageLoader loading={quiz.isLoading}>
          <Box sx={{ ...styles.textBox }}>
            <Stack sx={{ ...styles.headContainer }}>
              <Typography variant={dictionary.questCounterText}>
                კითხვა {counter + 1}/{quiz.Quiz.length}
              </Typography>
              <Typography
                variant={dictionary.timerTitle}
                sx={{ ...styles.timerText, fontWeight: "bold" }}
              >
                <Timer />
              </Typography>
            </Stack>
          </Box>
          <Stack sx={{ ...styles.bodyContainer }}>
            <CustomProgressBar value={counter} length={quiz.Quiz?.length} />
            <Typography
              variant={dictionary.questTitle}
              sx={{ fontWeight: "bold" }}
            >
              {quiz?.Quiz[counter]?.title}
            </Typography>
            <Grid
              container
              spacing={{ xs: 1, md: 1 }}
              columns={{ xs: 2, sm: 8, md: 12 }}
              sx={{ ...styles.answerContainer }}
            >
              {quiz.Quiz[counter]?.answer.map((element, index) => (
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
                    sx={{ ...styles.questBtn, fontWeight: "bold" }}
                    onClick={() =>
                      setAnswer(() => {
                        const answerArray = [...answer];
                        answerArray[counter] = index + 1;
                        return answerArray;
                      })
                    }
                  >
                    {element}
                  </Button>
                </Grid>
              ))}
            </Grid>
            <Stack>
              <Button
                color={dictionary.buttonColor}
                variant={dictionary.nextBtn}
                disabled={!answer[counter]}
                onClick={handleClick}
              >
                შემდეგი
              </Button>
            </Stack>
          </Stack>
        </PageLoader>
      </Stack>
      <FinishQuiz open={finish} personAnswer={answer} quiz={quiz.Quiz} />
    </PageLayout>
  );
};

export default Quiz;

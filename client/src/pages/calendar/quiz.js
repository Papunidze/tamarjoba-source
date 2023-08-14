import React, { useState } from "react";
import { questions } from "./quest";
import { Grid, Stack } from "@mui/material";
import { Button, Typography } from "antd";
import Result from "./result";

const Quiz = () => {
  const [level, setLevel] = useState("A1");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [currentLvl, setCurrentLvl] = useState();
  const [globalScore, setGlobalScore] = useState(0);
  const [answered, setAnswered] = useState(5);
  const handleAnswer = (answerIndex) => {
    const currentLevelQuestions = questions[level];
    const currentAnswer = currentLevelQuestions[currentQuestion].answer;
    const isCorrect = currentAnswer === answerIndex + 1;

    if (isCorrect) {
      setScore(score + 1);
      setGlobalScore(globalScore + 1);
    }

    if (currentQuestion === currentLevelQuestions.length - 1) {
      if (score >= 3 && level !== "Finish") {
        setLevel(nextLevel(level));
        setScore(0);
        setCurrentQuestion(0);
        setAnswered(answered + 5);
      } else {
        setCurrentLvl(level);
        setLevel("Failed");
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const nextLevel = (currentLevel) => {
    switch (currentLevel) {
      case "A1":
        return "A2";
      case "A2":
        return "A2+";
      case "A2+":
        return "Finish";
      default:
        return "A2+";
    }
  };

  if (level === "Failed") {
    return (
      <Result group={currentLvl} score={globalScore} answered={answered} />
    );
  }

  if (level === "Finish") {
    return <Result group={"A2+"} score={globalScore} answered={answered} />;
  }

  const currentLevelQuestions = questions[level];
  const currentQuestionData = currentLevelQuestions[currentQuestion];

  return (
    <Stack alignItems="center" justifyContent="center" spacing={3}>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mt: 6,
          gap: 1.5,
        }}
      >
        <Typography.Title
          style={{
            fontWeight: "bold",
            fontSize: "medium",

            whiteSpace: "pre-line",
          }}
        >
          {currentQuestionData.title}

          <Typography.Title
            style={{
              fontWeight: "bold",
              fontSize: "medium",
              whiteSpace: "pre-line",
              paddingTop: 4,
            }}
          >
            {currentQuestionData?.mainQuest}
          </Typography.Title>
        </Typography.Title>

        <Grid
          container
          spacing={1}
          columns={{ xs: 2, sm: 8, md: 12 }}
          sx={{
            placeItems: "center",
            placeContent: "center",
          }}
        >
          {currentQuestionData.options.map((option, index) => (
            <Grid item xs={6} key={index}>
              <Button
                danger
                style={{ width: "100%", color: "black" }}
                onClick={() => handleAnswer(index)}
              >
                {option}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default Quiz;

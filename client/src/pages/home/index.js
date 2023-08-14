import { Box, Button, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET } from "../../layout/app-action";
import PageLayout from "../../layout/app-page";
import dictionary from "../../layout/styles/dictionary";
import styles from "./styles/styles";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: RESET });
  });
  return (
    <Box sx={{ ...styles.mainContainer }} className="testsssss">
      <PageLayout>
        <Stack gap={1}>
          <Button
            varaint={dictionary.btnVariant}
            sx={{ ...styles.btn }}
            onClick={() => navigate("/learning?ru=true")}
          >
            დასწავლა
          </Button>
          <Button
            varaint={dictionary.btnVariant}
            sx={{ ...styles.btn }}
            onClick={() => navigate("/learning")}
          >
            თვითსწავლება
          </Button>
          <Button
            varaint={dictionary.btnVariant}
            sx={{ ...styles.btn }}
            onClick={() => navigate("/quiz")}
          >
            ტესტირება
          </Button>
        </Stack>
      </PageLayout>
    </Box>
  );
};

export default Home;

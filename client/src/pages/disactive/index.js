import { Button, CardActions, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PageLayout from "../../layout/app-page";
import dictionary from "./styles/dictionary";
import styles from "./styles/styles";

const DisActive = () => {
  const handleClick = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <PageLayout>
        <CardContent>
          <Typography
            variant={dictionary.txtVariant}
            sx={{ ...styles.disactivateText }}
          >
            სამწუხაროთ თქვენი სტატუსი შეჩერებულია
          </Typography>
          <Typography
            variant={dictionary.txtVariant}
            sx={{ ...styles.disactivateText }}
          >
            დამატებითი ინფორმაციისთვის დაუკავშირდით ადმინისტრაციას
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size={dictionary.btnSize}
            variant={dictionary.btnVariant}
            color={dictionary.btnColor}
            onClick={handleClick}
          >
            მთავარი
          </Button>
        </CardActions>
      </PageLayout>
    </Box>
  );
};

export default DisActive;

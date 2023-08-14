import React from "react";

import { Stack } from "@mui/material";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";

const Calendar = () => {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{ mt: 2, gap: 2, textAlign: "justify" }}
    >
      <Typography.Text style={{ fontWeight: "bold" }}>
        Если у вас есть языковая база, но вам нужно больше системы, больше
        глаголов, говорить у вас уже неплохо получается (используя то, что
        знаете) - можете присоединиться к нашим более продвинутым группам.
      </Typography.Text>
      <Typography.Text style={{ fontWeight: "bold" }}>
        Советую вам пройти наш бесплатный языковой тест, который порекомендует
        вам курс!
      </Typography.Text>
      <Typography.Text style={{ fontWeight: "bold" }}>
        Или же ниже можете посмотреть расписание имеющихся групп, выбрать
        самостоятельно подходящий уровень, расписание, и присоединиться к ним!
      </Typography.Text>
      <Typography.Text style={{ fontWeight: "bold" }}>
        Ждём вас в Тбилиси и в Батуми!!!
      </Typography.Text>
      <Typography style={{ fontWeight: "bold" }}>
        Пройдите простой тест на уровень знания грузинского языка от школы
        Tamarjoba 🤩
      </Typography>
      <Button danger type="primary" style={{ width: "100%", maxWidth: 350 }}>
        <Link to="/calendar/test">
          Тестирование для определения вашего уровня
        </Link>
      </Button>
      <Button danger type="primary" style={{ width: "100%", maxWidth: 350 }}>
        <Link to="/calendar/schedule">Посмотреть расписание занятий</Link>
      </Button>
    </Stack>
  );
};

export default Calendar;

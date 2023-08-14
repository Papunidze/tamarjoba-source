import React, { useEffect, useState } from "react";

import { Box, Grid, Stack } from "@mui/material";
import { Divider, Radio, Typography } from "antd";
import CalendarCard from "../../modules/admin/card";
import { useDispatch, useSelector } from "react-redux";
import { groupSchedul } from "../../action/schedule";
import Loading from "../../layout/app-loadding";
const optionsWithDisabled = [
  { label: "все", value: "все" },
  { label: "Батуми", value: "ბათუმი" },
  { label: "Тбилиси", value: "თბილისი" },
];

const Result = ({ score, group, answered }) => {
  const dispatch = useDispatch();
  const schedule = useSelector((state) => state.scheduleReducer.Schedule);
  const isLoading = useSelector((state) => state.scheduleReducer.isLoading);
  const [data, setData] = useState([]);
  const [value4, setValue4] = useState("все");
  useEffect(() => {
    dispatch(groupSchedul({ group: group }));
  }, [dispatch]);
  useEffect(() => {
    setData(schedule);
  }, [isLoading, schedule]);
  const onChange4 = ({ target: { value } }) => {
    const filteredData = schedule.filter((element) => {
      if (value === "все") {
        return true;
      } else if (value === "თბილისი" && element.city === "თბილისი") {
        return true;
      } else if (value === "ბათუმი" && element.city === "ბათუმი") {
        return true;
      }
      return false;
    });

    setData(filteredData);
    setValue4(value);
  };

  return (
    <Loading loading={isLoading}>
      <Stack gap={2} sx={{ width: "100%", textAlign: "center", mt: 7 }}>
        <Typography>Конец элементарной части</Typography>
        <Typography>
          Ваш результат {score}/{answered}
        </Typography>
        <Stack flexDirection={"row"} gap={2} justifyContent={"center"}>
          <Typography style={{ fontWeight: "bold" }}>Рекомендация:</Typography>
          <Typography>
            Пройдите курс "
            <span style={{ fontWeight: "bold", color: "crimson" }}>
              {group}
            </span>
            " школы "Tamarjoba"
          </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={4} sx={{ p: 1 }}>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
          style={{ paddingTop: "0.5rem" }}
        />

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {data.map((item, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={index}
              sx={{ display: "flex" }}
            >
              <CalendarCard isEditable={false} item={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Loading>
  );
};

export default Result;

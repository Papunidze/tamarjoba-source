import React, { useEffect, useState } from "react";
import { Divider, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../layout/app-loadding";
import { getSchedule } from "../../action/schedule";
import CalendarCard from "../../modules/admin/card";
import { Radio } from "antd";

const optionsWithDisabled = [
  { label: "все", value: "все" },
  { label: "Батуми", value: "ბათუმი" },
  { label: "Тбилиси", value: "თბილისი" },
];

const Schedule = () => {
  const schedule = useSelector((state) => state.scheduleReducer.Schedule);
  const isLoading = useSelector((state) => state.scheduleReducer.isLoading);
  const [data, setData] = useState([]);
  const [value4, setValue4] = useState("все");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedule());
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
      <Stack gap={4} sx={{ p: 1 }}>
        <Radio.Group
          options={optionsWithDisabled}
          onChange={onChange4}
          value={value4}
          optionType="button"
          buttonStyle="solid"
          style={{ paddingTop: "0.5rem" }}
        />

        <Divider />
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

export default Schedule;

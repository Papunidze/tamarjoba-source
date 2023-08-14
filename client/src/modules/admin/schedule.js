import React, { useEffect } from "react";
import CalendarCard from "./card";
import { Divider, Grid, Stack } from "@mui/material";
import AddGroup from "./addNewGroup";
import { useDispatch, useSelector } from "react-redux";
import { getSchedule } from "../../action/schedule";
import Loading from "../../layout/app-loadding";

const Schedule = () => {
  const schedule = useSelector((state) => state.scheduleReducer.Schedule);
  const isLoading = useSelector((state) => state.scheduleReducer.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchedule());
  }, [dispatch]);
  return (
    <Loading loading={isLoading}>
      <Stack gap={4}>
        <Divider />
        <AddGroup />
        <Divider />
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 12 }}
        >
          {schedule.map((item, index) => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={index}
              sx={{ display: "flex" }}
            >
              <CalendarCard isEditable={true} item={item} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Loading>
  );
};

export default Schedule;

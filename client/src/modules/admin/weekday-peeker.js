import React, { useState, useImperativeHandle, forwardRef } from "react";
import { Checkbox, Space, TimePicker } from "antd";
import dayjs from "dayjs";

const WeekdayPicker = ({ setData }, ref) => {
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);
  const [, setSelectedTimes] = useState({});
  const format = "HH:mm";

  const handleWeekdayChange = (weekday) => {
    const isChecked = selectedWeekdays.includes(weekday);
    if (isChecked) {
      setSelectedWeekdays((prevSelectedWeekdays) =>
        prevSelectedWeekdays.filter((day) => day !== weekday)
      );
      setSelectedTimes((prevSelectedTimes) => {
        const updatedTimes = { ...prevSelectedTimes };
        delete updatedTimes[weekday];
        return updatedTimes;
      });
      setData((prevSchedule) =>
        prevSchedule.filter((item) => item.weekday !== weekday)
      );
    } else {
      setSelectedWeekdays((prevSelectedWeekdays) => [
        ...prevSelectedWeekdays,
        weekday,
      ]);
      setData((prevSchedule) => [
        ...prevSchedule,
        { weekday: weekday, time: "12:00" },
      ]);
    }
  };

  const handleTimeChange = (weekday, time) => {
    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [weekday]: time,
    }));
    setData((prevSchedule) => {
      const updatedSchedule = prevSchedule.map((item) => {
        if (item.weekday === weekday) {
          return {
            ...item,
            time:
              dayjs(time).format(format) !== "Invalid Date"
                ? dayjs(time).format(format)
                : "12:00",
          };
        }
        return item;
      });
      return updatedSchedule;
    });
  };

  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useImperativeHandle(ref, () => ({
    reset: () => {
      setSelectedWeekdays([]);
      setSelectedTimes({});
      setData([]);
    },
  }));

  return (
    <Space direction="vertical">
      {weekdays.map((weekday) => (
        <div key={weekday}>
          <Checkbox
            checked={selectedWeekdays.includes(weekday)}
            onChange={() => handleWeekdayChange(weekday)}
          >
            {weekday}
          </Checkbox>
          {selectedWeekdays.includes(weekday) && (
            <TimePicker
              defaultValue={dayjs("12:00", format)}
              format={format}
              onChange={(time) => handleTimeChange(weekday, time)}
            />
          )}
        </div>
      ))}
    </Space>
  );
};

export default forwardRef(WeekdayPicker);

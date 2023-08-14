import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import {
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { disactiveStatus } from "../action/user";
import { useDispatch } from "react-redux";

export default function ResponsiveDatePickers({
  open,
  setOpen,
  setDate,
  date,
  id,
}) {
  // const compareDates = (d1, d2) => {
  //   let date1 = new Date(d1).getTime();
  //   let date2 = new Date(d2).getTime();
  //   if (date1 < date2) {
  //     console.log(true);
  //   } else if (date1 > date2) {
  //     console.log(false);
  //   } else {
  //     console.log(true);
  //   }
  // };
  // var today = new Date();
  // var date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // var today = new Date();
  // var dates =
  //   today.getFullYear() +
  //   "-" +
  //   (today.getMonth() + 1) +
  //   "-" +
  //   today.getDate();
  // console.log(new Date(date));

  const handleClose = () => {
    var today = new Date();
    var dates =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      (today.getDate() - 1);

    const active = { active: dates };
    const finalResult = Object.assign({ _id: id }, active);
    dispatch(disactiveStatus(finalResult));
    setOpen(false);
  };
  const handleChange = (newValue) => {
    setDate(newValue);
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const active = { active: date };
    const finalResult = Object.assign({ _id: id }, active);
    dispatch(disactiveStatus(finalResult));
    setOpen(false);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          position: "absolute",
          overflow: "scroll",
        }}
      >
        <DialogTitle sx={{ m: 1, p: 2 }}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: 0.5,
              justifyContent: "space-between",
            }}
          >
            <Typography>ანგარიშის გათიშვის დრო</Typography>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              orientation="landscape"
              value={date}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
              dayOfWeekFormatter={(day) => `${day}.`}
              toolbarFormat="eee dd MMMM"
              showToolbar
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSubmit}>
            შენახვა
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

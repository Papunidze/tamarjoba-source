import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, Paper, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import dictionary from "../auth/styles/dictionary";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { changePassword } from "../../action/user";
const Settings = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    const { id } = JSON.parse(localStorage.getItem("profile")).user;
    const finalResult = Object.assign({
      id,
      password: data.password,
      newPassword: data.newPassword,
    });

    dispatch(changePassword(finalResult));
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{"პარამეტრები"}</DialogTitle>
      <Paper component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack
            sx={{
              gap: 1,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              paddingTop: 1,
            }}
          >
            <TextField
              required
              label="ძველი პაროლი"
              autoComplete="on"
              size={dictionary.size}
              type={dictionary.passwordInput}
              error={!errors.password ? false : true}
              helperText={!errors.password ? "" : "მინიმუმ 6 სიმბოლო"}
              {...register(`password`, {
                required: true,
                minLength: 6,
              })}
            />
            <TextField
              required
              label="ახალი პაროლი"
              autoComplete="on"
              size={dictionary.size}
              type={dictionary.passwordInput}
              error={!errors.password ? false : true}
              helperText={!errors.password ? "" : "მინიმუმ 6 სიმბოლო"}
              {...register(`newPassword`, {
                required: true,
                minLength: 6,
              })}
            />
            <TextField
              required
              label="გაიმეორეთ პაროლი"
              autoComplete="on"
              size={dictionary.size}
              type={dictionary.passwordInput}
              error={!errors.repeatpassword ? false : true}
              helperText={!errors.repeatpassword ? "" : "პაროლი არ ემთხვევა"}
              {...register(`repeatpassword`, {
                required: true,
                validate: (value) => value === getValues("newPassword"),
              })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="error" variant="contained" type="submit">
            შენახვა
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

export default Settings;

import { Button, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import styles from "./styles/styles";
import dictionary from "./styles/dictionary";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registration } from "../../action/user";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ ...styles.authPaper }}
    >
      <Stack gap={1}>
        <Typography variant={dictionary.txtVar}>გაიარეთ რეგისტრაცია</Typography>
        <TextField
          required
          label="სახელი"
          size={dictionary.size}
          error={!errors.name ? false : true}
          helperText={!errors.name ? "" : "შეიყვანეთ სწორი სახელი"}
          {...register(`name`, {
            required: true,
            pattern: /^[A-Za-z]+$/,
            minLength: 2,
          })}
        />
        <TextField
          required
          label="გვარი"
          size={dictionary.size}
          error={!errors.lastname ? false : true}
          helperText={!errors.lastname ? "" : "შეიყვანეთ სწორი გვარი"}
          {...register(`lastname`, {
            required: true,
            pattern: /^[A-Za-z]+$/,
            minLength: 4,
          })}
        />
        <TextField
          required
          label="იმეილი"
          size={dictionary.size}
          error={!errors.email ? false : true}
          helperText={!errors.email ? "" : "შეიყვანეთ სწორი იმეილი"}
          {...register(`email`, {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            minLength: 4,
          })}
        />
        <TextField
          required
          label="პაროლი"
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
          label="გაიმეორეთ პაროლი"
          autoComplete="on"
          size={dictionary.size}
          type={dictionary.passwordInput}
          error={!errors.repeatpassword ? false : true}
          helperText={!errors.repeatpassword ? "" : "პაროლი არ ემთხვევა"}
          {...register(`repeatpassword`, {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />

        <Button
          variant={dictionary.btnVariant}
          sx={{ ...styles.authBtn }}
          type="submit"
        >
          რეგისტრაცია
        </Button>
      </Stack>
    </Paper>
  );
};

export default Register;
